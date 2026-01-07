import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type MonthlySalesI = {
  monthly_revenue: number;
};

class MonthlySalesRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all reviews from the "order_archive" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT SUM(oa.price) AS monthly_revenue FROM order_archive oa JOIN user u ON oa.user_iduser = u.iduser WHERE u.user_role = 'admin' AND MONTH(oa.purchase_date) = MONTH(CURRENT_DATE()) AND YEAR(oa.purchase_date) = YEAR(CURRENT_DATE());",
    );
    // Return the array of reviews
    return rows as MonthlySalesI[];
  }
}

export default new MonthlySalesRepository();
