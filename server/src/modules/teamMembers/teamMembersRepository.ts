import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface TeamMemberRow {
  iduser: number;
  firstname: string;
  user_photo: string | null;
  user_describe: string | null;
  user_role: string;
  user_type: string | null;
}

export interface TeamMember {
  id: number;
  firstname: string;
  photo: string | null;
  bio: string | null;
  role: string;
  userType: string | null;
}

class TeamMembersRepository {
  // Pour lire tous les membres de l'équipe //
  async readAll(): Promise<TeamMember[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
            iduser,
            firstname,
            user_photo,
            user_describe,
            user_role,
            user_type
            FROM user
            WHERE user_role = 'admin'
            ORDER BY iduser ASC`,
    );
    return (rows as TeamMemberRow[]).map((row) => this.formatTeamMember(row));
  }

  // Pour lire un membre de l'équipe via son ID //
  async read(id: number): Promise<TeamMember | null> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        iduser,
        firstname,
        user_photo,
        user_describe,
        user_role,
        user_type
        FROM user
        WHERE iduser = ? AND user_role = 'admin'`,
      [id],
    );

    const members = rows as TeamMemberRow[];
    if (members.length === 0) {
      return null;
    }
    return this.formatTeamMember(members[0]);
  }

  // Pour formater le nommage SQL en JS //
  private formatTeamMember(row: TeamMemberRow): TeamMember {
    return {
      id: row.iduser,
      firstname: row.firstname,
      photo: row.user_photo,
      bio: row.user_describe,
      role: row.user_role,
      userType: row.user_type,
    };
  }

  // Pour créer un nouveau membre de l'équipe //
  async create(member: Omit<TeamMember, "id">): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (firstname, user_photo, user_describe, user_role, user_type)
      VALUES (?, ?, ?, ?, ?)`,
      [
        member.firstname,
        member.photo,
        member.bio,
        member.role,
        member.userType,
      ],
    );
    return result;
  }

  // Pour mettre à jour un membre de l'équipe //
  async update(id: number, data: Partial<TeamMember>): Promise<Result> {
    // Partial permet de rendre tous les champs optionnels //
    const fields: string[] = []; // Champs à mettre à jour //
    const values: (string | number | null)[] = []; // Valeurs correspondantes //

    const mapping: Record<string, string> = {
      bio: "user_describe",
      photo: "user_photo",
      userType: "user_type",
      role: "user_role",
    };

    // On ne renvoit que les champs à mettre à jour //
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && mapping[key]) {
        fields.push(`${mapping[key]} = ?`);
        values.push(value);
      }
    }
    // Si aucun champ n'est à mettre à jour, on ne fait rien //
    if (fields.length === 0) return { affectedRows: 0 } as Result;

    values.push(id);
    // Construction et exécution de la requête //
    const [result] = await databaseClient.query<Result>(
      `UPDATE user SET ${fields.join(", ")} WHERE iduser = ?`,
      values,
    );
    return result;
  }

  // Pour supprimer un membre de l'équipe //
  async delete(id: number): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE iduser = ?",
      [id],
    );
    return result;
  }
}

export default new TeamMembersRepository();
