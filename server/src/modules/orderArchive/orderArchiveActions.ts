import type { RequestHandler } from "express";
import basketRepository from "../../modules/basket/basketRepository";
import orderArchiveRepository from "../../modules/orderArchive/orderArchiveRepository";

interface AuthenticatedRequest extends Express.Request {
  user?: { id: number };
}

// Créer une commande depuis le panier
export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const cartItems = await basketRepository.getCartItems(userId);
    if (!cartItems || cartItems.length === 0) {
      res.status(400).json({ message: "Panier vide" });
      return;
    }

    const { delivery } = req.body;
    if (!delivery) {
      res.status(400).json({ message: "Adresse requise" });
      return;
    }

    // Créer une entrée temporaire pour générer idorder
    const orderIdResult =
      await orderArchiveRepository.createOrderHeader(userId);
    const idorder = orderIdResult.insertId;

    //  Copier tous les articles du panier dans order_archive
    for (const item of cartItems) {
      await orderArchiveRepository.addItem({
        idorder,
        user_saler_id: item.salerId ?? userId,
        user_order_id: userId,
        price: item.watch_price,
        purchase_date: new Date(),
        street_number: delivery.number ?? null,
        street: delivery.street,
        zip_code: delivery.zip,
        city: delivery.city,
        watch_id: item.idwatch,
        user_iduser: userId,
      });
    }

    //  Vider le panier
    await basketRepository.clearCart(userId);

    res.status(201).json({ message: "Commande créée avec succès", idorder });
  } catch (err) {
    next(err);
  }
};
