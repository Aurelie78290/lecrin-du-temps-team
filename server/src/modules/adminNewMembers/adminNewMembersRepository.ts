import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
type NewMembersI = {
  new_members_count: number;
};

class adminNewMembersRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all new members from the "user" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS new_members_count FROM `user` WHERE `created_at` >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND `deleted_at` IS NULL;",
    );
    // Return the array of reviews
    return rows as NewMembersI[];
  }
}

export default new adminNewMembersRepository();
