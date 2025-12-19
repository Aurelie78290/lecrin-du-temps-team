import type { RequestHandler } from "express";

// Import access to data
import watchRepository from "./watchRepository";

// =======================
// B - Browse (Read All)
// =======================
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const watches = await watchRepository.readAll();
    res.json(watches);
  } catch (err) {
    next(err);
  }
};

// =======================
// R - Read (Read One)
// =======================
const read: RequestHandler = async (req, res, next) => {
  try {
    const watchId = Number(req.params.id);

    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    const watch = await watchRepository.read(watchId);

    if (watch == null) {
      res.sendStatus(404);
    } else {
      res.json(watch);
    }
  } catch (err) {
    next(err);
  }
};

// =======================
// A - Add (Create)
// =======================
const add: RequestHandler = async (req, res, next) => {
  try {
    const newWatch = {
      user_id: req.body.user_id ?? null,
      brand: req.body.brand,
      model: req.body.model,
      watch_price: req.body.watch_price ?? null,
      photo_id: req.body.photo_id ?? null,
      watch_condition: req.body.watch_condition ?? null,
    };

    // Validation minimale (important)
    if (!newWatch.brand || !newWatch.model) {
      res.status(400).json({ message: "brand et model sont requis" });
      return;
    }

    const insertId = await watchRepository.create(newWatch);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
};
