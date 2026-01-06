import databaseClient from "../../../../database/client";
import type { Result, Rows } from "../../../../database/client";

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

class TeamMemberRepository {
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
            WHERE user_role IN ('team-member', 'admin')
            ORDER BY iduser ASC`,
    );
    return (rows as TeamMemberRow[]).map(this.formatTeamMember);
  }

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
        WHERE iduser = ? AND user_role IN ('team-member', 'admin')`,
      [id],
    );

    const members = rows as TeamMemberRow[];
    if (members.length === 0) {
      return null;
    }
    return this.formatTeamMember(members[0]);
  }

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

  async update(id: number, data: Partial<TeamMember>): Promise<Result> {
    const fields: string[] = [];
    const values: (string | number | null)[] = [];

    if (data.bio !== undefined) {
      fields.push("user_describe = ?");
      values.push(data.bio);
    }

    if (data.photo !== undefined) {
      fields.push("user_photo = ?");
      values.push(data.photo);
    }
    if (data.userType !== undefined) {
      fields.push("user_type = ?");
      values.push(data.userType);
    }
    values.push(id);

    const [result] = await databaseClient.query<Result>(
      `UPDATE user SET ${fields.join(", ")} WHERE iduser = ?`,
      values,
    );
    return result;
  }

  async updateRole(id: number, role: string): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET user_role = ? WHERE iduser = ?",
      [role, id],
    );
    return result;
  }
}

export default new TeamMemberRepository();
