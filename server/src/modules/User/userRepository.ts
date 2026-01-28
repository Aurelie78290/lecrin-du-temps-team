import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Result } from "../../../database/client";

// interface qui représente une ligne de la BDD //
interface UserRow {
  iduser: number;
  firstname: string;
  lastname: string;
  e_mail: string;
  user_role: string;
  password?: string;
  birthdate?: string;
  tel?: string;
  last_login?: string;
  count_personal?: number;
  count_pending?: number;
  count_active?: number;
}

export interface UserAccount {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password?: string;
  birthdate?: string | null;
  tel?: string | null;
  last_login?: string | null;
  count_personal?: number;
  count_pending?: number;
  count_active?: number;
}

class UserRepository {
  // Pour créer un nouveau user //
  async create(user: Omit<UserAccount, "id">): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (firstname, lastname, e_mail, password, user_role)
            VALUES (?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.role || "user", // par défault le role est user //
      ],
    );
    return result; // Contient donc l'ID généré //
  }

  // Chercher par email (pour le login) //
  async findByEmail(email: string): Promise<UserAccount | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT iduser, firstname, lastname, e_mail, user_role, password, birthdate, tel FROM user WHERE e_mail = ?",
      [email],
    );
    const users = rows as UserRow[];
    if (users.length === 0) {
      return null;
    }
    return this.formatUser(users[0]);
  }
  // Chercher par ID (pour check la session)
  async findById(id: number): Promise<UserAccount | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT iduser, firstname, lastname, e_mail, user_role, birthdate, tel FROM user WHERE iduser = ?",
      [id],
    );
    const users = rows as UserRow[];
    if (users.length === 0) {
      return null;
    }
    return this.formatUser(users[0]);
  }

  // Formater le nommage de SQL en JS //
  private formatUser(row: UserRow): UserAccount {
    return {
      id: row.iduser,
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.e_mail,
      role: row.user_role,
      password: row.password,
      birthdate: row.birthdate,
      tel: row.tel,
    };
  }

  // Mettre a jour des données user //
  async update(user: UserAccount): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, e_mail = ?, birthdate = ?, tel = ? WHERE iduser = ?",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.birthdate,
        user.tel,
        user.id,
      ],
    );
    return result;
  }

  //*** Reset du MDP ***//

  //Stockage du token et son expiration //

  async setResetToken(
    email: string,
    token: string,
    expiry: Date,
  ): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET reset_token = ?, reset_token_expiry = ? WHERE e_mail = ?",
      [token, expiry, email],
    );
    return result;
  }

  // Recherche d'un user par son token et check si token non expiré //

  async findByResetToken(token: string): Promise<UserAccount | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT iduser AS id, firstname, lastname, e_mail AS email, user_role AS role, password, birthdate, tel FROM user WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as UserAccount;
  }

  // Mise à jour du MDP et effacer le token //

  async updatePassword(userId: number, passwordHash: string): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE iduser = ?",
      [passwordHash, userId],
    );
    return result;
  }

  // Pour recupérer le status d'une montre dans la collection d'un user (personal(collection), pending(en attente de validation), active (en vente)) //
  async getUserWatchStatus(): Promise<UserAccount[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
      u.iduser, u.firstname, u.lastname, u.e_mail, u.user_role, u.last_login, u.birthdate, u.tel,
      COUNT(CASE WHEN w.watch_sell_status = 'personal' THEN 1 END) AS count_personal,
      COUNT (CASE WHEN w.watch_sell_status = 'pending' THEN 1 END) AS count_pending,
      COUNT (CASE WHEN w.watch_sell_status = 'active' THEN 1 END) AS count_active
      FROM user u
      LEFT JOIN watch w ON u.iduser = w.user_id
      GROUP BY u.iduser`,
    );
    return (rows as UserRow[]).map((row) => ({
      ...this.formatUser(row),
      last_login: row.last_login,
      count_personal: row.count_personal || 0,
      count_pending: row.count_pending || 0,
      count_active: row.count_active || 0,
    }));
  }

  // Pour recuperer et mettre a jour la derniere connexion d'un user //
  async updateLastLogin(userId: number): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET last_login = NOW() WHERE iduser = ?",
      [userId],
    );
    return result;
  }
}

export default new UserRepository();
