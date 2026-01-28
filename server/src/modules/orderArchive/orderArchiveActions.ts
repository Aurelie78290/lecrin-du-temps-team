import type { RequestHandler } from "express";
import basketRepository from "../../modules/basket/basketRepository";
import orderArchiveRepository from "../../modules/orderArchive/orderArchiveRepository";
import watchRepository from "../watch/watchRepository";

interface AuthenticatedRequest extends Express.Request {
  user?: { id: number };
}

// Créer une commande depuis le panier
export const createOrderFromStripe: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const { sessionId, delivery } = req.body;

    if (!sessionId || !delivery) {
      res.status(400).json({ message: "données manquantes" });
      return;
    }

    // Vérifier que la session n'a pas déjà créé une commande
    // (pour éviter les doublons si l'utilisateur rafraîchit la page)
    const existingOrder =
      await orderArchiveRepository.findBySessionId(sessionId);
    if (existingOrder) {
      res.json({
        message: "Commande déjà créée",
        orderId: existingOrder.idorder,
      });
      return;
    }

    const cartItems = await basketRepository.getCartItems(userId);
    if (!cartItems || cartItems.length === 0) {
      res.status(400).json({ message: "Panier vide" });
      return;
    }

    // on vérifie la disponibilité des montres
    const unavailableItems: string[] = [];
    for (const item of cartItems) {
      const isAvailable = await watchRepository.isAvailable(item.idwatch);
      if (!isAvailable) {
        unavailableItems.push(`${item.brand} ${item.model}`);
      }
    }

    if (unavailableItems.length > 0) {
      res.status(400).json({
        message: `Articles non disponibles : ${unavailableItems.join(", ")}`,
      });
      return;
    }

    const orderIds: number[] = [];
    const soldWatches: number[] = [];

    for (const item of cartItems) {
      for (let i = 0; i < item.quantity; i++) {
        const result = await orderArchiveRepository.addItem({
          user_order_id: userId,
          user_saler_id: item.salerId ?? userId,
          price: item.watch_price,
          purchase_date: new Date(),
          street_number: delivery.number ?? null,
          street: delivery.street,
          zip_code: delivery.zip,
          city: delivery.city,
          watch_id: item.idwatch,
          user_iduser: userId,
          stripe_session_id: sessionId,
        });
        orderIds.push(result.insertId);
      }

      // Ajouter à la liste des montres à marquer comme vendues
      if (!soldWatches.includes(item.idwatch)) {
        soldWatches.push(item.idwatch);
      }
    }

    for (const WatchId of soldWatches) {
      console.log("Updating watch to sold:", WatchId);
      await watchRepository.updateById(WatchId, { watch_sell_status: "sold" });
    }

    //  Vider le panier
    await basketRepository.clearCart(userId);

    res.status(201).json({ message: "Commande créée avec succès", orderIds });
  } catch (err) {
    next(err);
  }
};
