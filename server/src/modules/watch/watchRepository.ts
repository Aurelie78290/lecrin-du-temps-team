import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type WatchCreateInput = {
  brand_id: number;
  model_id: number;
  user_id: number;
  watch_price: number | null;
  watch_condition: string | null;
  watch_sell_status: string;
};

export type WatchListItem = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition: string | null;
  photo_url?: string | null;
  watch_sell_status?: string | null;
  watch_gender?: string | null;
  movement_type?: string | null;
  ref_no?: number | null;
};

export type WatchDetails = {
  idwatch: number;
  user_id: number | null;

  brand: string;
  model: string;

  ref_no: number | null;
  production_year: string | null;
  is_limited_edition: number | null;
  edition_number: string | null;

  watch_gender: string | null;
  watch_sell_status: string | null;
  watch_price: number | null;

  diameter_mm: number | null;
  thickness_mm: number | null;
  water_resistance_bar: number | null;

  dial_color: string | null;

  case_material_label: string | null;
  dial_finish_label: string | null;
  hour_marker_type_label: string | null;
  strap_material_label: string | null;
  clasp_type_label: string | null;
  movement_type_label: string | null;
  functions_label: string | null;

  strap_color: string | null;
  lug_width_mm: number | null;
  watch_condition: string | null;

  caliber: string | null;
  power_reserve_hours: number | null;
  frequency_hz: number | null;
  jewel_count: number | null;

  market_data_id: number;
  order_archive_id: number;
  order_archive_watch_id: number;

  // Nouvelle structure pour les photos
  photos: string[];
  certificates: string[];

  is_in_mycollection?: boolean;

  case_material_id?: number | null;
  dial_finish_id?: number | null;
  hour_marker_type_id?: number | null;
  strap_material_id?: number | null;
  clasp_type_id?: number | null;
  movement_type_id?: number | null;
  functions_id?: number | null;
};

export type WatchUpdateInput = Partial<{
  brand_id: number;
  model_id: number;
  watch_price: number | null;
  watch_condition: string | null;

  watch_sell_status: "personal" | "pending" | "active" | "sold" | null;
  production_year: string | null;
  ref_no: string | null;

  is_limited_edition: number | null;
  edition_number: string | null;
}>;

type WatchOwnerStatus = {
  user_id: number;
  watch_sell_status: string | null;
};

class WatchRepository {
  // ======================
  // C - Create
  // ======================
  async create(watch: WatchCreateInput) {
    const [result] = await databaseClient.query<Result>(
      `
    INSERT INTO watch (brand_id, model_id, user_id, watch_price, watch_condition, watch_sell_status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        watch.brand_id,
        watch.model_id,
        watch.user_id,
        watch.watch_price,
        watch.watch_condition,
        watch.watch_sell_status ?? "pending",
      ],
    );

    return result.insertId;
  }

  // ======================
  // C - Add to collection
  // ======================
  async addToCollection(userId: number, watchId: number) {
    await databaseClient.query(
      `
    INSERT INTO user_has_watch (user_id, watch_id, added_at)
    VALUES (?, ?, NOW())
    ON DUPLICATE KEY UPDATE user_id = user_id
    `,
      [userId, watchId],
    );
  }

  // Récupère les données pour le graphique (valeur cumulée)
  async getCollectionValueOverTime(userId: number) {
    const [rows] = await databaseClient.query(
      `
    SELECT 
      DATE(uhw.added_at) as date,
      SUM(w.watch_price) OVER (ORDER BY uhw.added_at) as cumulative_value
    FROM user_has_watch uhw
    JOIN watch w ON w.idwatch = uhw.watch_id
    WHERE uhw.user_id = ?
      AND w.watch_price IS NOT NULL
    ORDER BY uhw.added_at
    `,
      [userId],
    );
    return rows;
  }
  // ======================
  // R - Read one (DETAILS)
  // ======================

  async read(id: number, userId?: number) {
    // 1) Watch + labels
    const [watchRows] = await databaseClient.query<Rows>(
      `
    SELECT
      w.*,
      b.name AS brand,
      m.name AS model,
      cm.case_material_name AS case_material_label,
      ct.clasp_type_name AS clasp_type_label,
      df.dial_finish_name AS dial_finish_label,
      hm.hour_maker_type_name AS hour_marker_type_label,
      sm.strap_material_name AS strap_material_label,
      fn.function_name AS functions_label,
      mt.movement_type AS movement_type_label
    FROM watch w
    JOIN brand b ON b.id = w.brand_id
    JOIN model m ON m.id = w.model_id
    LEFT JOIN case_material cm ON cm.idcase_material = w.case_material_id
    LEFT JOIN clasp_type ct ON ct.idclasp_type = w.clasp_type_id
    LEFT JOIN dial_finish df ON df.iddial_finish = w.dial_finish_id
    LEFT JOIN hour_maker_type hm ON hm.idhour_maker_type = w.hour_marker_type_id
    LEFT JOIN strap_material sm ON sm.idstrap_material = w.strap_material_id
    LEFT JOIN functions fn ON fn.idfunctions = w.functions_id
    LEFT JOIN movement_type mt ON mt.idmovement_type = w.movement_type_id
    WHERE w.idwatch = ?
    LIMIT 1
    `,
      [id],
    );

    if (watchRows.length === 0) return null;

    // 2) Photos (avec id pour pouvoir delete)
    type PhotoRow = {
      id: number;
      url: string;
      type: "watch" | "certificate";
      watch_id: number;
    };

    const [photoRows] = await databaseClient.query<Rows>(
      `
    SELECT id, url, type, watch_id
    FROM photo
    WHERE watch_id = ?
    ORDER BY id
    `,
      [id],
    );

    const allPhotos = photoRows as PhotoRow[];

    const watch_photos = allPhotos.filter((p) => p.type === "watch");
    const certificate_photos = allPhotos.filter(
      (p) => p.type === "certificate",
    );

    // compat front (string[])
    const photos = watch_photos.map((p) => p.url);
    const certificates = certificate_photos.map((p) => p.url);

    // 3) Flag collection
    let isInMyCollection = false;
    if (userId) {
      const [rows] = await databaseClient.query<Rows>(
        `
      SELECT 1
      FROM user_has_watch
      WHERE user_id = ? AND watch_id = ?
      LIMIT 1
      `,
        [userId, id],
      );
      isInMyCollection = rows.length > 0;
    }

    // 4) Return complet
    return {
      ...(watchRows[0] as Record<string, unknown>),

      photos, // string[]
      certificates, // string[]

      watch_photos, // {id,url,type,watch_id}[]
      certificate_photos, // {id,url,type,watch_id}[]

      is_in_my_collection: isInMyCollection,
    };
  }

  // ======================
  // R - Read all (Boutique)
  // ======================
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
SELECT
  w.idwatch,
  b.name AS brand,
  m.name AS model,
  w.watch_price,
  w.watch_condition,
  w.watch_sell_status, 
  (
    SELECT url
    FROM photo
    WHERE watch_id = w.idwatch
      AND type = 'watch'
    LIMIT 1
  ) AS photo_url
FROM watch w
JOIN brand b ON b.id = w.brand_id
JOIN model m ON m.id = w.model_id
WHERE w.watch_sell_status = 'active';

    `,
    );

    return rows as WatchListItem[];
  }

  // ======================
  // R - Read all Shop (avec filtres)
  // ======================
  async readAllShop(filters: Record<string, string | number> = {}) {
    let sql = `
    SELECT
      w.idwatch,
      b.name AS brand,
      m.name AS model,
      w.watch_price,
      w.watch_condition,
      w.watch_sell_status,
      w.watch_gender,
      mt.movement_type,
      (
        SELECT url
        FROM photo
        WHERE watch_id = w.idwatch
          AND type = 'watch'
        LIMIT 1
      ) AS photo_url
    FROM watch w
    JOIN brand b ON b.id = w.brand_id
    JOIN model m ON m.id = w.model_id
    LEFT JOIN movement_type mt ON mt.idmovement_type = w.movement_type_id
    WHERE w.watch_sell_status = 'active'
  `;

    const params: (string | number)[] = [];

    // Ajout des filtres de recherche

    if (filters.search) {
      sql += ` AND (
      m.name LIKE ? OR 
      b.name LIKE ? OR 
      w.ref_no LIKE ?
    )`;
      const searchPattern = `%${filters.search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (filters.watch_gender) {
      sql += " AND w.watch_gender = ?";
      params.push(filters.watch_gender);
    }

    if (filters.brand_id) {
      sql += " AND w.brand_id = ?";
      params.push(filters.brand_id);
    }

    if (filters.movement_type_id) {
      sql += " AND w.movement_type_id = ?";
      params.push(filters.movement_type_id);
    }

    sql += " ORDER BY w.idwatch DESC";

    const [rows] = await databaseClient.query<Rows>(sql, params);

    return rows as WatchListItem[];
  }

  // ======================

  // R - Read all (collection)
  // ======================
  async readAllCollection(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
SELECT
  w.idwatch,
  b.name AS brand,
  m.name AS model,
  w.watch_price,
  w.watch_condition,
  w.watch_sell_status, 
  (
    SELECT url
    FROM photo
    WHERE watch_id = w.idwatch
      AND type = 'watch'
    LIMIT 1
  ) AS photo_url
FROM watch w
JOIN user_has_watch uhw ON uhw.watch_id = w.idwatch
JOIN brand b ON b.id = w.brand_id
JOIN model m ON m.id = w.model_id
WHERE uhw.user_id = ?;

    `,
      [userId],
    );

    return rows as WatchListItem[];
  }

  async readOwnerAndStatus(watchId: number): Promise<WatchOwnerStatus | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT user_id, watch_sell_status FROM watch WHERE idwatch = ? LIMIT 1",
      [watchId],
    );
    const list = rows as WatchOwnerStatus[];
    return list[0] ?? null;
  }

  // ======================
  // R - Read many by ids (FAVORIS)
  // ======================

  async readManyByIds(ids: number[]) {
    if (ids.length === 0) return [];

    const placeholders = ids.map(() => "?").join(",");

    const [rows] = await databaseClient.query<Rows>(
      `
    SELECT
      w.idwatch,
      b.name AS brand,
      m.name AS model,
      w.watch_price,
      w.watch_condition,
      w.watch_sell_status,
      w.watch_gender,
      mt.movement_type,
      (
        SELECT url
        FROM photo
        WHERE watch_id = w.idwatch
          AND type = 'watch'
        LIMIT 1
      ) AS photo_url
    FROM watch w
    JOIN brand b ON b.id = w.brand_id
    JOIN model m ON m.id = w.model_id
    LEFT JOIN movement_type mt ON mt.idmovement_type = w.movement_type_id
    WHERE w.idwatch IN (${placeholders})
    `,
      ids,
    );

    return rows as WatchListItem[];
  }

  // ======================
  // U - Update (watch)
  // ======================
  async updateById(idwatch: number, updates: WatchUpdateInput) {
    const keys = Object.keys(updates) as (keyof WatchUpdateInput)[];

    if (keys.length === 0) return false;

    // construit: "brand_id = ?, model_id = ?, watch_price = ?"
    const setClause = keys.map((k) => `${String(k)} = ?`).join(", ");
    const values = keys.map((k) => updates[k]);

    const [result] = await databaseClient.query<Result>(
      `UPDATE watch SET ${setClause} WHERE idwatch = ?`,
      [...values, idwatch],
    );

    return result.affectedRows > 0;
  }

  // ======================
  // U - Mark as sold
  // ======================

  async readSellStatus(watchId: number): Promise<string | null> {
    const [rows] = await databaseClient.query<
      Rows & { watch_sell_status: string | null }[]
    >("SELECT watch_sell_status FROM watch WHERE idwatch = ? LIMIT 1", [
      watchId,
    ]);

    if (rows.length === 0) return null;
    return rows[0].watch_sell_status;
  }

  async markAsSoldIfActive(watchId: number, status: string): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      `UPDATE watch 
     SET watch_sell_status = 'sold'
     WHERE idwatch = ? AND watch_sell_status = 'active'`,
      [status, watchId],
    );

    return result.affectedRows > 0;
  }

  async isAvailable(watchId: number): Promise<boolean> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT watch_sell_status FROM watch WHERE idwatch = ?",
      [watchId],
    );

    if (rows.length === 0) return false;

    const watch = rows[0] as { watch_sell_status: string | null };
    return watch.watch_sell_status === "active";
  }

  // ======================
  // D - Delete (watch)
  // ======================
  async deleteOrderArchiveByWatchId(watchId: number) {
    await databaseClient.query<Result>(
      "DELETE FROM order_archive WHERE watch_id = ?",
      [watchId],
    );
  }
  async deleteById(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM watch WHERE idwatch = ?",
      [id],
    );
    return result.affectedRows > 0;
  }

  async removeFromCollection(userId: number, watchId: number): Promise<number> {
    const [result] = await databaseClient.query(
      "DELETE FROM user_has_watch WHERE user_id = ? AND watch_id = ?",
      [userId, watchId],
    );

    const r = result as { affectedRows?: number };
    return r.affectedRows ?? 0;
  }
}

export default new WatchRepository();
