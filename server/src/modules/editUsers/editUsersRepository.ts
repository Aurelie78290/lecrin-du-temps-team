import databaseClient from "../../../database/client";
import type { ResultSetHeader } from "mysql2";

class EditUsersRole {
  async readAll() {
    const [rows] = await databaseClient.query(
      "SELECT iduser AS id, e_mail AS email, user_role AS role FROM user",
    );
    return rows;
  }

  async updateRole(id: number, role: string) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE user SET user_role = ? WHERE iduser = ?",
      [role, id],
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM user WHERE iduser=?",
      [id],
    );
    return result;
  }
}

export default new EditUsersRole();
