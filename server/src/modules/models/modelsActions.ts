import type { RequestHandler } from "express";

// Import access to data
import modelsRepository from "./modelsRepository";

// =======================
// B - Browse (Read All)
// =======================
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const models = await modelsRepository.readAll();
    res.json(models);
  } catch (err) {
    next(err);
  }
};

// =======================
// R - Read (Read One)
// =======================

// =======================
// A - Add (Create)
// =======================

export default {
  browse,
};
