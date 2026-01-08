import type { RequestHandler } from "express";

// Import access to data
import brandsRepository from "./brandsRepository";

// =======================
// B - Browse (Read All)
// =======================
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const brands = await brandsRepository.readAll();
    res.json(brands);
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
