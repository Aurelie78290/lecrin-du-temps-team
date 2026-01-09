import adminNewMembersRepository from "./adminNewMembersRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const totalNewMembers = await adminNewMembersRepository.readAll();

    res.json(totalNewMembers);
  } catch (err) {
    next(err);
  }
};

export default { browse };
