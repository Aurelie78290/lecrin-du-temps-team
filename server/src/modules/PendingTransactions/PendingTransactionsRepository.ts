import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
type PendingTransactionsI = {
  total_pending: number;
};

class PendingTransactions {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all reviews from the "cart" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS total_pending FROM cart;",
    );
    // Return the array of reviews
    return rows as PendingTransactionsI[];
  }
}

export default new PendingTransactions();
