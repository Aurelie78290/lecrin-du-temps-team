// import databaseClient from "../../../database/client";

// import type { Result, Rows } from "../../../database/client";

// export type Watch = {
//   idwatch: number;
//   user_id: number | null;
//   brand: string;
//   model: string;
//   watch_price: number | null;
//   watch_condition: string | null;

//   url_photo1?: string;
//   url_photo2?: string;
//   url_photo3?: string;
//   url_photo4?: string;
//   url_photo5?: string;
// };

// class WatchRepository {
//   // ======================
//   // C - Create
//   // ======================
//   async create(watch: Omit<Watch, "idwatch">) {
//     const [result] = await databaseClient.query<Result>(
//       `
//       INSERT INTO watch (user_id, brand, model, watch_price, photo_id)
//       VALUES (?, ?, ?, ?, ?)
//       `,
//       [watch.user_id, watch.brand, watch.model, watch.watch_price, null],
//     );

//     return result.insertId;
//   }

//   // ======================
//   // R - Read one
//   // ======================
//   async read(id: number) {
//     const [rows] = await databaseClient.query<Rows>(
//       `
//       SELECT
//         w.idwatch,
//         w.user_id,
//         w.brand,
//         w.model,
//         w.watch_price,
//         w.watch_condition,
//         p.url_photo1,
//         p.url_photo2,
//         p.url_photo3,
//         p.url_photo4,
//         p.url_photo5
//       FROM watch w
//       LEFT JOIN photo p ON p.idphoto = w.photo_id
//       WHERE w.idwatch = ?
//       `,
//       [id],
//     );

//     return rows[0] as Watch;
//   }

//   // ======================
//   // R - Read all
//   // ======================
//   async readAll() {
//     const [rows] = await databaseClient.query<Rows>(
//       `
//       SELECT
//         w.idwatch,
//         w.brand,
//         w.model,
//         w.watch_price,
//         w.watch_condition,
//         p.url_photo1
//       FROM watch w
//       LEFT JOIN photo p ON p.idphoto = w.photo_id
//       `,
//     );

//     return rows as Watch[];
//   }

//   // ======================
//   // U - Update (optionnel)
//   // ======================
//   // async update(watch: Watch) {}

//   // ======================
//   // D - Delete (optionnel)
//   // ======================
//   // async delete(id: number) {}
// }

// export default new WatchRepository();

import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type WatchCreateInput = {
  user_id: number | null;
  brand: string;
  model: string;
  watch_price: number | null;
  photo_id: number | null;
  watch_condition: string | null;
};

export type WatchListItem = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition: string | null;
  url_photo1?: string | null;
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
  certificate_label: string | null;

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

  // Photos
  url_photo1?: string | null;
  url_photo2?: string | null;
  url_photo3?: string | null;
  url_photo4?: string | null;
  url_photo5?: string | null;

  case_material_id?: number | null;
  dial_finish_id?: number | null;
  hour_marker_type_id?: number | null;
  strap_material_id?: number | null;
  clasp_type_id?: number | null;
  movement_type_id?: number | null;
  functions_id?: number | null;
  certificate_id?: number | null;
};

class WatchRepository {
  // ======================
  // C - Create
  // ======================
  async create(watch: WatchCreateInput) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO watch (user_id, brand, model, watch_price, photo_id, watch_condition)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        watch.user_id,
        watch.brand,
        watch.model,
        watch.watch_price,
        watch.photo_id,
        watch.watch_condition,
      ],
    );

    return result.insertId;
  }

  // ======================
  // R - Read one (DETAILS)
  // ======================
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
    SELECT
      w.*,

      cm.case_material_name      AS case_material_label,
      ct.clasp_type_name         AS clasp_type_label,
      df.dial_finish_name        AS dial_finish_label,
      hm.hour_maker_type_name    AS hour_marker_type_label,
      sm.strap_material_name     AS strap_material_label,
      fn.function_name           AS functions_label,
      mt.movement_type           AS movement_type_label,
      cert.certificate_name      AS certificate_label,

      p.url_photo1,
      p.url_photo2,
      p.url_photo3,
      p.url_photo4,
      p.url_photo5

    FROM watch w
    LEFT JOIN photo p ON p.idphoto = w.photo_id

    LEFT JOIN case_material   cm   ON cm.idcase_material = w.case_material_id
    LEFT JOIN clasp_type      ct   ON ct.idclasp_type = w.clasp_type_id
    LEFT JOIN dial_finish     df   ON df.iddial_finish = w.dial_finish_id
    LEFT JOIN hour_maker_type hm   ON hm.idhour_maker_type = w.hour_marker_type_id
    LEFT JOIN strap_material  sm   ON sm.idstrap_material = w.strap_material_id
    LEFT JOIN functions       fn   ON fn.idfunctions = w.functions_id
    LEFT JOIN movement_type   mt   ON mt.idmovement_type = w.movement_type_id
    LEFT JOIN certificate_id  cert ON cert.idcertificate_id = w.certificate_id

    WHERE w.idwatch = ?
    `,
      [id],
    );

    const watch = rows[0] as unknown;
    if (!watch) return null;

    return watch as WatchDetails;
  }

  // ======================
  // R - Read all (LISTING)
  // ======================
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        w.idwatch,
        w.brand,
        w.model,
        w.watch_price,
        w.watch_condition,
        p.url_photo1
      FROM watch w
      LEFT JOIN photo p ON p.idphoto = w.photo_id
      `,
    );

    return rows as WatchListItem[];
  }
}

export default new WatchRepository();
