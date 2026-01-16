import pendingAddRepository from "./pendingAddRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const pendingAddFromDB = await pendingAddRepository.readAll();

    res.json(pendingAddFromDB);
  } catch (err) {
    next(err);
  }
};

const browseNb: RequestHandler = async (req, res, next) => {
  try {
    const nbPendingAddFromDB = await pendingAddRepository.readNbAd();

    res.json(nbPendingAddFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const pendingAddId = Number.parseInt(req.params.id);
    const pendingAdd = await pendingAddRepository.read(pendingAddId);

    if (pendingAdd != null) {
      res.json(pendingAdd);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific review based on the provided ID
    const pendingAdd = {
      idwatch: Number(req.body.idwatch),
      watch_sell_status: String(req.body.status),
    };

    const affectedRows = await pendingAddRepository.update(pendingAdd);

    // If the review is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the review in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, browseNb, read, edit };
