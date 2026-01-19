import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

// Import du typage depuis le fichier watchRepository //
import type { WatchDetails, WatchListItem } from "../watch/watchRepository";

class pendingAdd {
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
  // =================================
  // R - Read all (Annonces à valider)
  // =================================
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        w.idwatch,
        b.name AS brand,
        m.name AS model,
        w.watch_price,
        w.watch_condition,
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
      WHERE w.watch_sell_status = 'A valider';
    `,
    );

    return rows as WatchListItem[];
  }
  // =================================
  // R - Read Number of type of Ad (compte les nombre d'annonces à valider, Validées et refusées)
  // =================================
  async readNbAd() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      watch_sell_status, 
      COUNT(*) AS total
      FROM watch
      WHERE watch_sell_status IN ('A valider', 'Refusée', 'En vente')
      GROUP BY watch_sell_status;`,
    );

    return rows as WatchListItem[];
  }
  // ====================================
  // U - Up date (Maj du status de vente)
  // ====================================
  async update(watch: Partial<WatchDetails>) {
    // Execute the SQL UPDATE query to update an existing sell_status in the "watch" table
    const [result] = await databaseClient.query<Result>(
      "UPDATE watch SET watch_sell_status = ? WHERE idwatch = ?",
      [watch.watch_sell_status, watch.idwatch],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new pendingAdd();
