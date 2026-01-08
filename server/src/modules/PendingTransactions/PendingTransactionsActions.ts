import PendingTransactionsRepository from "./PendingTransactionsRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const totalPending = await PendingTransactionsRepository.readAll();

    res.json(totalPending);
  } catch (err) {
    next(err);
  }
};

export default { browse };
