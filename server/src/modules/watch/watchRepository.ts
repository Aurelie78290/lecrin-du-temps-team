import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type WatchCreateInput = {
  user_id: number | null;
  brand_id: number;
  model_id: number;
  watch_price: number | null;
  watch_condition: string | null;
};

export type WatchListItem = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition: string | null;
  photo_url: string | null;
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

  case_material_id?: number | null;
  dial_finish_id?: number | null;
  hour_marker_type_id?: number | null;
  strap_material_id?: number | null;
  clasp_type_id?: number | null;
  movement_type_id?: number | null;
  functions_id?: number | null;
};

class WatchRepository {
  // ======================
  // C - Create
  // ======================
  async create(watch: WatchCreateInput) {
    const [result] = await databaseClient.query<Result>(
      `
    INSERT INTO watch (user_id, brand_id, model_id, watch_price, watch_condition)
    VALUES (?, ?, ?, ?, ?)
    `,
      [
        watch.user_id,
        watch.brand_id,
        watch.model_id,
        watch.watch_price,
        watch.watch_condition,
      ],
    );

    return result.insertId;
  }

  // ======================
  // R - Read one (DETAILS)
  // ======================
  async read(id: number) {
    // 1. Récupérer la montre avec ses infos
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
    `,
      [id],
    );

    if (watchRows.length === 0) return null;

    // 2. Récupérer les photos de cette montre
    const [photoRows] = await databaseClient.query<Rows>(
      "SELECT url, type FROM photo WHERE watch_id = ? ORDER BY id",
      [id],
    );

    // 3. Séparer les photos et les certificats
    const photosArray = photoRows as { url: string; type: string }[];

    const watchPhotos = photosArray
      .filter((p) => p.type === "watch")
      .map((p) => p.url);

    const certificates = photosArray
      .filter((p) => p.type === "certificate")
      .map((p) => p.url);
    // 4. Retourner la montre avec ses photos
    return {
      ...watchRows[0],
      photos: watchPhotos,
      certificates,
    } as WatchDetails;
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
      (SELECT url FROM photo WHERE watch_id = w.idwatch AND type = 'watch' LIMIT 1) AS photo_url
    FROM watch w
    JOIN brand b ON b.id = w.brand_id
    JOIN model m ON m.id = w.model_id
    WHERE w.scope = 'SHOP'
    `,
    );

    return rows as WatchListItem[];
  }

  // ======================
  // R - Read all (Shop)
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
      (SELECT url FROM photo WHERE watch_id = w.idwatch AND type = 'watch' LIMIT 1) AS photo_url
    FROM watch w
    JOIN brand b ON b.id = w.brand_id
    JOIN model m ON m.id = w.model_id
    WHERE w.scope = 'COLLECTION'
      AND w.user_id = ?
    `,
      [userId],
    );

    return rows as WatchListItem[];
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
}

export default new WatchRepository();
