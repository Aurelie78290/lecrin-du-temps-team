import adminVolTranRepository from "./adminVolTranRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const volumeTransactionPerDay = await adminVolTranRepository.readAll();

    res.json(volumeTransactionPerDay);
  } catch (err) {
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse };
