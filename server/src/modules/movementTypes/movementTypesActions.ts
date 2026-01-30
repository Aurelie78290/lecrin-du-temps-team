import type { RequestHandler } from "express";
import movementTypesRepository from "./movementTypesRepository";

// =======================
// B - Browse (Read All)
// =======================
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const movementTypes = await movementTypesRepository.readAll();
    res.json(movementTypes);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};
