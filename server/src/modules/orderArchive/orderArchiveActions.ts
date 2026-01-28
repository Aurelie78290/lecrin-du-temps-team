import type { RequestHandler } from "express";
import basketRepository from "../../modules/basket/basketRepository";
import orderArchiveRepository from "../../modules/orderArchive/orderArchiveRepository";
// import watchRepository from "../watch/watchRepository";

interface AuthenticatedRequest extends Express.Request {
  user?: { id: number };
}

// const isWatchAvailable = async (watchId: number): Promise<boolean> => {
//   const watch = await watchRepository.read(watchId);
//   return watch?.watch_sell_status === "active";
// };

// Créer une commande depuis le panier
export const createOrderFromStripe: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const { sessionId } = req.body;

    if (!sessionId) {
      res.status(400).json({ message: "Session ID requis" });
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

    // Récupérer les infos de la session Stripe depuis les métadonnées
    const { delivery } = req.body;
    if (!delivery) {
      res.status(400).json({ message: "Adresse requise" });
      return;
    }

    const cartItems = await basketRepository.getCartItems(userId);
    if (!cartItems || cartItems.length === 0) {
      res.status(400).json({ message: "Panier vide" });
      return;
    }

    const orderIds: number[] = [];

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
    }

    //  Vider le panier
    await basketRepository.clearCart(userId);

    res.status(201).json({ message: "Commande créée avec succès", orderIds });
  } catch (err) {
    next(err);
  }
};
