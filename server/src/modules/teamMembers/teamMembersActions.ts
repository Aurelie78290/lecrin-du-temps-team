import type { RequestHandler } from "express";
import teamMembersRepository from "./teamMembersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const teamMembers = await teamMembersRepository.readAll();
    res.json(teamMembers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const teamMemberId = Number(req.params.id);

    if (Number.isNaN(teamMemberId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }
    const teamMember = await teamMembersRepository.read(teamMemberId);

    if (teamMember == null) {
      res.status(404).json({ error: "Membre de l'équipe non trouvé" });
      return;
    }
    res.json(teamMember);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const teamMemberId = Number(req.params.id);

    if (Number.isNaN(teamMemberId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }
    const result = await teamMembersRepository.update(teamMemberId, req.body);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Membre de l'équipe non trouvé" });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, photo, bio, role, userType } = req.body;
    const insertId = await teamMembersRepository.create({
      firstname,
      photo,
      bio,
      role: role || "team member",
      userType,
    });
    res
      .status(201)
      .json({ id: insertId.insertId, message: "Membre ajouté avec succès" });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const teamMemberId = Number(req.params.id);
    const result = await teamMembersRepository.delete(teamMemberId);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Membre de l'équipe non trouvé" });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
