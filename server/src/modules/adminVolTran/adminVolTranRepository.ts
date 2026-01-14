import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type VolTran = {
  nombre_de_transactions: number;
  jour: string;
};

class ReviewsRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all trasactions and dates from the "order_archive" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT DATE(purchase_date) AS jour, COUNT(*) AS nombre_de_transactions FROM order_archive WHERE purchase_date >= CURRENT_DATE - INTERVAL 30 DAY GROUP BY DATE(purchase_date) ORDER BY jour ASC;",
    );

    // Return the array of order_archive
    return rows as VolTran[];
  }
}

export default new ReviewsRepository();
