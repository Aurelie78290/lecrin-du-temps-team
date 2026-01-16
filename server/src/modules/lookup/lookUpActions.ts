// modules/lookups/lookupsActions.ts
import type { RequestHandler } from "express";
import lookupsRepository from "./lookUpRepository";

const brands: RequestHandler = async (_req, res, next) => {
  try {
    res.json(await lookupsRepository.readBrands());
  } catch (e) {
    next(e);
  }
};

const modelsByBrand: RequestHandler = async (req, res, next) => {
  try {
    const brandId = Number(req.params.brandId);
    if (Number.isNaN(brandId)) {
      res.sendStatus(400);
      return;
    }
    res.json(await lookupsRepository.readModelsByBrand(brandId));
  } catch (e) {
    next(e);
  }
};

const caseMaterials: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "case_material",
        "idcase_material",
        "case_material_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const claspTypes: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "clasp_type",
        "idclasp_type",
        "clasp_type_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const dialFinishes: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "dial_finish",
        "iddial_finish",
        "dial_finish_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const hourMarkerTypes: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "hour_maker_type",
        "idhour_maker_type",
        "hour_maker_type_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const strapMaterials: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "strap_material",
        "idstrap_material",
        "strap_material_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const movementTypes: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "movement_type",
        "idmovement_type",
        "movement_type",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const functionsList: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "functions",
        "idfunctions",
        "function_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

const certificates: RequestHandler = async (_req, res, next) => {
  try {
    res.json(
      await lookupsRepository.readSimple(
        "certificate_id",
        "idcertificate_id",
        "certificate_name",
      ),
    );
  } catch (e) {
    next(e);
  }
};

export default {
  brands,
  modelsByBrand,
  caseMaterials,
  claspTypes,
  dialFinishes,
  hourMarkerTypes,
  strapMaterials,
  movementTypes,
  functionsList,
  certificates,
};
