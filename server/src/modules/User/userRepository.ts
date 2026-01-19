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
  birthdate: string;
  tel: string;
}

export interface UserAccount {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password?: string;
  birthdate: string;
  tel: string;
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
}

export default new UserRepository();
