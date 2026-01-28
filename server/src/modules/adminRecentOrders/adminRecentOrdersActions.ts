import adminRecentOrdersRepository from "./adminRecentOrdersRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const recentOrders = await adminRecentOrdersRepository.read();

    res.json(recentOrders);
  } catch (err) {
    next(err);
  }
};

export default { browse };
