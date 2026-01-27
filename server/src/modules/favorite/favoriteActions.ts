import type { Request, RequestHandler } from "express";
import favoriteRepository from "./favoriteRepository";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const ids = await favoriteRepository.getFavoriteIds(userId);
    res.json(ids);
  } catch (err) {
    next(err);
  }
};

const toggle: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const watchId = Number(req.params.watchId);
    if (!watchId) {
      res.status(400).json({ message: "watchId requis" });
      return;
    }

    const already = await favoriteRepository.isFavorite(userId, watchId);

    if (already) {
      await favoriteRepository.removeFavorite(userId, watchId);
      res.json({ isFavorite: false });
    } else {
      await favoriteRepository.addFavorite(userId, watchId);
      res.json({ isFavorite: true });
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, toggle };
