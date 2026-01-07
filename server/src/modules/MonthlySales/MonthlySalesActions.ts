import MonthlySalesRepository from "./MonthlySalesRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const reviewsFromDB = await MonthlySalesRepository.readAll();

    res.json(reviewsFromDB);
  } catch (err) {
    next(err);
  }
};

export default { browse };
