import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
type RecentOrdersI = {
  idorder: number;
  purchase_date: Date;
  price: number;
  user_role: string;
  brand: string;
  model: string;
};

class adminRecentOrdersRepository {
  async read() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT oa.purchase_date, oa.price, u.user_role, b.name AS brand, m.name AS model, idorder FROM `order_archive` AS oa JOIN `user` AS u ON oa.user_iduser = u.iduser JOIN `watch` AS w ON oa.watch_id = w.idwatch JOIN `brand` AS b ON w.brand_id = b.id JOIN `model` AS m ON w.model_id=m.id ORDER BY oa.purchase_date DESC",
    );
    return rows as RecentOrdersI[];
  }
}

export default new adminRecentOrdersRepository();
