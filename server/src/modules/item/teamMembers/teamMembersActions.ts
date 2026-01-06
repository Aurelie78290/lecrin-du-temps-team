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

    const { photo, bio, userType } = req.body;

    const updateData: { photo?: string; bio?: string; userType?: string } = {};
    if (photo !== undefined) updateData.photo = photo;
    if (bio !== undefined) updateData.bio = bio;
    if (userType !== undefined) updateData.userType = userType;

    const result = await teamMembersRepository.update(teamMemberId, updateData);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Membre non trouvé" });
      return;
    }

    res.status(200).json({
      message: "Membre mis à jour avec succès",
      id: teamMemberId,
    });
  } catch (err) {
    next(err);
  }
};

const updateRole: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (Number.isNaN(userId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }
    if (!["user", "team-member", "admin"].includes(role)) {
      res.status(400).json({
        error: "Rôle invalide. Utilisez: user, team-member, ou admin",
      });
      return;
    }

    const result = await teamMembersRepository.updateRole(userId, role);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({
      message: "Rôle mis à jour avec succès",
      id: userId,
      newRole: role,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, updateRole };
