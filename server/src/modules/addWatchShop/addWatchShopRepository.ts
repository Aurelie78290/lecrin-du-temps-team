import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export interface WatchI {
  user_id: number;
  idwatch?: number; // Optionnel car absent lors de la création
  brand_id: number;
  model_id: number;
  watch_condition: string;
  ref_no: string;
  production_year: string; // Stocké en string au format "AAAA-MM-JJ"
  is_limited_edition: boolean;
  edition_number: string | null; // Peut être null si non limité
  watch_price: number;
  watch_gender: string;
  case_material_id: number;
  diameter_mm: number;
  thickness_mm: number;
  water_resistance_bar: number;
  dial_color: string;
  dial_finish_id: number;
  hour_marker_type_id: number;
  strap_material_id: number;
  clasp_type_id: number;
  strap_color: string;
  lug_width_mm: number;
  movement_type_id: number;
  caliber: string;
  functions_id: number;
  power_reserve_hours: number;
  frequency_hz: number;
  jewel_count: number;
  watch_sell_status: string;
}
class addWatchShopRepository {
  async createWatchToShop(watch: Omit<WatchI, "idwatch">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO watch (user_id, 
      brand_id, model_id, watch_condition, ref_no, production_year, 
      is_limited_edition, edition_number, watch_price, watch_gender, 
      case_material_id, diameter_mm, thickness_mm, water_resistance_bar, 
      dial_color, dial_finish_id, hour_marker_type_id, strap_material_id, 
      clasp_type_id, strap_color, lug_width_mm, movement_type_id, 
      caliber, functions_id, power_reserve_hours, frequency_hz, 
      jewel_count, watch_sell_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        watch.user_id,
        watch.brand_id,
        watch.model_id,
        watch.watch_condition,
        watch.ref_no,
        watch.production_year,
        watch.is_limited_edition, // Sera envoyé comme 1/0 (true/false) par le driver
        watch.edition_number,
        watch.watch_price,
        watch.watch_gender,
        watch.case_material_id,
        watch.diameter_mm,
        watch.thickness_mm,
        watch.water_resistance_bar,
        watch.dial_color,
        watch.dial_finish_id,
        watch.hour_marker_type_id,
        watch.strap_material_id,
        watch.clasp_type_id,
        watch.strap_color,
        watch.lug_width_mm,
        watch.movement_type_id,
        watch.caliber,
        watch.functions_id,
        watch.power_reserve_hours,
        watch.frequency_hz,
        watch.jewel_count,
        watch.watch_sell_status,
      ],
    );

    return result.insertId;
  }
  async readAll() {
    // Prepared the SQL SELECT query to retrieve all items table for watch description from the "brand", "model", "case_material", "dial_finish", "hour_maker_type", "strap_material", "clasp_type", "movement_type", "function" table
    const brandPromise = databaseClient.query<Rows>("SELECT * FROM  `brand`");
    const modelPromise = databaseClient.query<Rows>("SELECT * FROM  `model`");
    const caseMaterialPromise = databaseClient.query<Rows>(
      "SELECT * FROM  `case_material`",
    );
    const dialFinishPromise = databaseClient.query<Rows>(
      "SELECT * FROM  `dial_finish`",
    );
    const hourMakerTypePromise = databaseClient.query<Rows>(
      "SELECT * FROM  `hour_maker_type`",
    );
    const strapMaterialPromise = databaseClient.query<Rows>(
      "SELECT * FROM  `strap_material`",
    );
    const claspTypePromise = databaseClient.query<Rows>(
      "SELECT * FROM  `clasp_type`",
    );
    const movementTypePromise = databaseClient.query<Rows>(
      "SELECT * FROM  `movement_type`",
    );
    const functionTablePromise = databaseClient.query<Rows>(
      "SELECT * FROM  `functions`",
    );
    // Envoi de l'ensemble des requêtes à la BDD
    const [
      [brandRes],
      [modelRes],
      [case_materialRes],
      [dial_finishRes],
      [hour_maker_typeRes],
      [strap_materialRes],
      [clasp_typeRes],
      [movement_typeRes],
      [function_tableRes],
    ] = await Promise.all([
      brandPromise,
      modelPromise,
      caseMaterialPromise,
      dialFinishPromise,
      hourMakerTypePromise,
      strapMaterialPromise,
      claspTypePromise,
      movementTypePromise,
      functionTablePromise,
    ]);

    //Envoi du résultat issu de la BDD au endPoint
    return {
      brand: brandRes,
      model: modelRes,
      case_material: case_materialRes,
      dial_finish: dial_finishRes,
      hour_maker_type: hour_maker_typeRes,
      strap_material: strap_materialRes,
      clasp_type: clasp_typeRes,
      movement_type: movement_typeRes,
      function_table: function_tableRes,
    };
  }
}

export default new addWatchShopRepository();
