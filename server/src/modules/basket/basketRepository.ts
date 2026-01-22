import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

import type { ResultSetHeader } from "mysql2";

type CartItem = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number;
  quantity: number;
  salerId: number;
};

// type Cart = {
//   idcart: number;
//   user_iduser: number;
//   status: string;
//   total_amount: number;
//   created_at: Date;
//   update_at: Date;
// };

class BasketRepository {
  // Récupérer ou créer le panier actif d'un utilisateur
  async getOrCreateActiveCart(userId: number): Promise<number> {
    // 1. Chercher un panier actif
    const [carts] = await databaseClient.query<Rows>(
      `SELECT idcart FROM cart 
       WHERE user_iduser = ? AND status = 'active' 
       LIMIT 1`,
      [userId],
    );

    if (carts.length > 0) {
      return carts[0].idcart as number;
    }

    // 2. Si pas de panier actif, en créer un
    const [result] = await databaseClient.query<ResultSetHeader>(
      `INSERT INTO cart (user_iduser, created_at, update_at, status, total_amount) 
       VALUES (?, NOW(), NOW(), 'active', 0)`,
      [userId],
    );

    return result.insertId;
  }

  // Récupérer tout le contenu du panier d'un utilisateur
  async getCartItems(userId: number): Promise<CartItem[]> {
    const cartId = await this.getOrCreateActiveCart(userId);

    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        w.idwatch,
        b.name AS brand,
        m.name AS model,
        w.watch_price,
        COUNT(*) AS quantity
      FROM watch_has_cart whc
      JOIN watch w ON whc.watch_idwatch = w.idwatch
      JOIN brand b ON w.brand_id = b.id
      JOIN model m ON w.model_id = m.id
      WHERE whc.cart_idcart = ?
      GROUP BY w.idwatch, b.name, m.name, w.watch_price`,
      [cartId],
    );

    return rows as CartItem[];
  }

  // Ajouter une montre au panier
  async addItem(userId: number, watchId: number): Promise<void> {
    const cartId = await this.getOrCreateActiveCart(userId);

    // Vérifier si la montre existe déjà
    const [existing] = await databaseClient.query<Rows>(
      `SELECT COUNT(*) as count FROM watch_has_cart 
       WHERE cart_idcart = ? AND watch_idwatch = ?`,
      [cartId, watchId],
    );

    const count = (existing[0] as { count: number }).count;

    if (count === 0) {
      // Ajouter la montre
      await databaseClient.query(
        `INSERT INTO watch_has_cart (cart_idcart, watch_idwatch) 
         VALUES (?, ?)`,
        [cartId, watchId],
      );
    } else {
      // Pour gérer la quantité, on ajoute une nouvelle ligne
      // (car la table de liaison n'a pas de champ quantity)
      await databaseClient.query(
        `INSERT INTO watch_has_cart (cart_idcart, watch_idwatch) 
         VALUES (?, ?)`,
        [cartId, watchId],
      );
    }

    // Mettre à jour le total
    await this.updateCartTotal(cartId);
  }

  // Retirer une montre du panier
  async removeItem(userId: number, watchId: number): Promise<void> {
    const cartId = await this.getOrCreateActiveCart(userId);

    // Supprimer une seule occurrence
    await databaseClient.query(
      `DELETE FROM watch_has_cart 
       WHERE cart_idcart = ? AND watch_idwatch = ? 
       LIMIT 1`,
      [cartId, watchId],
    );

    await this.updateCartTotal(cartId);
  }

  // Vider complètement le panier
  async clearCart(userId: number): Promise<void> {
    const cartId = await this.getOrCreateActiveCart(userId);

    await databaseClient.query(
      "DELETE FROM watch_has_cart WHERE cart_idcart = ?",
      [cartId],
    );

    await this.updateCartTotal(cartId);
  }

  // Mettre à jour le montant total du panier
  private async updateCartTotal(cartId: number): Promise<void> {
    const [result] = await databaseClient.query<Rows>(
      `SELECT COALESCE(SUM(w.watch_price), 0) as total
       FROM watch_has_cart whc
       JOIN watch w ON whc.watch_idwatch = w.idwatch
       WHERE whc.cart_idcart = ?`,
      [cartId],
    );

    const total = (result[0] as { total: number }).total;

    await databaseClient.query(
      `UPDATE cart SET total_amount = ?, update_at = NOW() 
       WHERE idcart = ?`,
      [total, cartId],
    );
  }
}

export default new BasketRepository();
