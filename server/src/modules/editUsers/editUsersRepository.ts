import databaseClient from "../../../database/client";
import type { ResultSetHeader } from "mysql2";

class EditUsersRole {
  // Lecture de tous les utilisateurs //
  async readAll() {
    // On récupère les utilisateurs, et on les renomme proprement //
    const [rows] = await databaseClient.query(
      "SELECT iduser AS id, firstname, lastname, e_mail AS email, user_role AS role, birthdate, tel FROM user",
    );
    return rows;
  }

  // Pour mettre à jour le rôle d'un utilisateur de manière ciblée //
  async updateRole(id: number, role: string) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE user SET user_role = ? WHERE iduser = ?",
      [role, id],
    );
    return result;
  }

  // Pour supprimer un utilisateur de manière ciblée //
  async delete(id: number) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM user WHERE iduser=?",
      [id],
    );
    return result;
  }
}

export default new EditUsersRole();
