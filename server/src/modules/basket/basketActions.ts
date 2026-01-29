import type { Request } from "express";
import type { RequestHandler } from "express";
import basketRepository from "../../modules/basket/basketRepository";

type AuthenticatedRequest = Request & { user?: { id: number; role: string } };

// Récupérer le panier de l'utilisateur connecté
const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const items = await basketRepository.getCartItems(userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Ajouter un article au panier
const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const { watchId } = req.body;

    if (!watchId) {
      res.status(400).json({ message: "watchId requis" });
      return;
    }

    await basketRepository.addItem(userId, Number(watchId));

    // Retourner le panier mis à jour
    const items = await basketRepository.getCartItems(userId);
    res.status(201).json(items);
  } catch (err) {
    next(err);
  }
};

// Retirer un article du panier
const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const { watchId } = req.params;

    if (!watchId) {
      res.status(400).json({ message: "watchId requis" });
      return;
    }

    await basketRepository.removeItem(userId, Number(watchId));

    // Retourner le panier mis à jour
    const items = await basketRepository.getCartItems(userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Vider le panier
const clear: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    await basketRepository.clearCart(userId);

    res.json({ message: "Panier vidé", items: [] });
  } catch (err) {
    next(err);
  }
};

export default { browse, add, remove, clear };
