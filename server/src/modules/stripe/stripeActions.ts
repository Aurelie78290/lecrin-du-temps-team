import type { RequestHandler } from "express";
import Stripe from "stripe";
import basketRepository from "../basket/basketRepository";
import watchRepository from "../watch/watchRepository";

interface AuthenticatedRequest extends Express.Request {
  user?: { id: number };
}

//initialisation de Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Fonction helper pour vérifier la disponibilité
const isWatchAvailable = async (watchId: number): Promise<boolean> => {
  const status = await watchRepository.readSellStatus(watchId);
  return status === "active";
};

//création d'une session de paiement
export const createCheckoutSession: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    //on récupère le panier
    const cartItems = await basketRepository.getCartItems(userId);
    if (!cartItems || cartItems.length === 0) {
      res.status(400).json({ message: "Panier vide" });
      return;
    }

    const { delivery } = req.body;
    if (!delivery || !delivery.street || !delivery.zip || !delivery.city) {
      res.status(400).json({ message: "Adresse de livraison requise" });
      return;
    }

    //Vérification de la disponibilité AVANT de créer la session Stripe
    const unavailableItems: string[] = [];
    for (const item of cartItems) {
      const isAvailable = await isWatchAvailable(item.idwatch);
      if (!isAvailable) {
        unavailableItems.push(`${item.brand} ${item.model}`);
      }
    }

    if (unavailableItems.length > 0) {
      res.status(400).json({
        message: `Articles non disponibles : ${unavailableItems.join(", ")}. Veuillez mettre à jour votre panier.`,
      });
      return;
    }

    //création des lignes d'item pour stripe
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `${item.brand} ${item.model}`,
          description: `Montre - Référence: ${item.idwatch}`,
        },
        unit_amount: Math.round(item.watch_price * 100),
      },
      quantity: item.quantity,
    }));

    //création de la session de paiement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/ThankYou?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/ShopPayment`,
      customer_email: req.body.email,
      metadata: {
        userId: userId.toString(),
        delivery: JSON.stringify(delivery),
      },
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Erreur Stripe:", err);
  }
};

//Vérifier le statut d'une session de paiement
export const verifyPayment: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({ message: "Session ID resquis" });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const delivery = session.metadata?.delivery
        ? JSON.parse(session.metadata.delivery)
        : null;

      res.json({
        paid: true,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
        delivery,
      });
    } else {
      res.json({ paid: false });
    }
  } catch (err) {
    console.error("Erreur vérification paiement:", err);
    next(err);
  }
};

// Webhook Stripe (pour recevoir les événements de paiement)
export const handleWebhook: RequestHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (err) {
    console.error("Erreur webhook:", err);
    res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    return;
  }

  // Gérer l'événement
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Paiement réussi:", session.id);

      const userId = Number.parseInt(session.metadata?.userId || "0");
      if (userId) {
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Paiement échoué:", paymentIntent.id);
      break;
    }
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  res.json({ received: true });
};

export default {
  createCheckoutSession,
  verifyPayment,
  handleWebhook,
};
