import addWatchShopRepository from "./addWatchShopRepository";
import readAllWatchListRepository from "./addWatchShopRepository";

import type { RequestHandler } from "express";

const readAllWatchList: RequestHandler = async (req, res, next) => {
  try {
    const allList = await readAllWatchListRepository.readAll();
    res.json(allList);
  } catch (err) {
    next(err);
  }
};

const addWatchShop: RequestHandler = async (req, res, next) => {
  try {
    console.log("Valeur reçue pour la date :", req.body.production_year);
    // Transformation de is-limited_edition d'une chaîne de caractére à un nombre-Boolean
    const binaryIsLimitedEdition = Number.parseInt(req.body.is_limited_edition);

    //Objet qui sera envoyé à la BDD
    const newWatchToSell = {
      user_id: Number(req.body.user_id) || 1,
      brand_id: Number(req.body.brand_id) || 1,
      model_id: Number(req.body.model_id) || 1,
      watch_condition: String(req.body.watch_condition) || "N/A",
      ref_no: String(req.body.ref_no) || "N/A",
      production_year:
        req.body.production_year || new Date().toISOString().split("T")[0],
      is_limited_edition: Boolean(binaryIsLimitedEdition),
      edition_number: String(req.body.edition_number) || "N/A",
      watch_price: Number(req.body.watch_price) || 1,
      watch_gender: String(req.body.watch_gender) || "N/A",
      case_material_id: Number(req.body.case_material_id) || 1,
      diameter_mm: Number(req.body.diameter_mm) || 1,
      thickness_mm: Number(req.body.thickness_mm) || 1,
      water_resistance_bar: Number(req.body.water_resistance_bar) || 1,
      dial_color: String(req.body.dial_color) || "N/A",
      dial_finish_id: Number(req.body.dial_finish_id) || 1,
      hour_marker_type_id: Number(req.body.hour_maker_type) || 1,
      strap_material_id: Number(req.body.strap_material_id) || 1,
      clasp_type_id: Number(req.body.clasp_type_id) || 1,
      strap_color: String(req.body.strap_color) || "N/A",
      lug_width_mm: Number(req.body.lug_width_mm) || 1,
      movement_type_id: Number(req.body.movement_type_id) || 1,
      caliber: String(req.body.caliber) || "N/A",
      functions_id: Number(req.body.functions_id) || 1,
      power_reserve_hours: Number(req.body.power_reserve_hours) || 1,
      frequency_hz: Number(req.body.frequency_hz) || 1,
      jewel_count: Number(req.body.jewel_count) || 1,
      watch_sell_status: String(req.body.watch_sell_status) || "N/A",
    };

    //Creation de l'annonce avec la requete SQL venant du fichier Repository
    const addWatchToSell =
      await addWatchShopRepository.createWatchToShop(newWatchToSell);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ addWatchToSell });
  } catch (err) {
    next(err);
  }
};
export default { readAllWatchList, addWatchShop };
