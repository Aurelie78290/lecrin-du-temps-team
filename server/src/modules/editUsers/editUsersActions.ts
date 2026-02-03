import type { Request, RequestHandler } from "express";
import editUsersRepository from "./editUsersRepository";

// Pour définir le type de requête avec l'authMiddleware //
interface AuthRequest extends Request {
  auth?: { id: number; role: string };
}

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await editUsersRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await editUsersRepository.updateRole(Number(id), role);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Erreur lors de la mise a jour");
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { idToDelete } = req.body;
    const authReq = req as AuthRequest;
    const userIdFromToken = authReq.auth?.id; // Permet de récupérer l'ID de l'utilisateur via son token //

    if (!idToDelete) {
      res.status(400).send("ID de l'utilisateur manquant");
      return;
    }
    // Pour empêcher un utilisateur de supprimer son propre compte //
    if (Number(idToDelete) === userIdFromToken) {
      res.status(403).send("Vous ne pouvez pas supprimer votre propre compte.");
      return;
    }
    const result = await editUsersRepository.delete(Number(idToDelete));

    if (result.affectedRows === 0) {
      res.status(404).send("Utilisateur non trouvé");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, update, destroy };
