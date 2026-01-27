import type { RowDataPacket } from "mysql2";
import type { ResultSetHeader } from "mysql2/promise";
import databaseClient from "../../../database/client";

export type OrderArchiveItem = {
  idorder?: number;
  user_saler_id: number;
  user_order_id: number;
  price: number;
  purchase_date?: Date;
  street_number?: number;
  street?: string;
  zip_code?: number;
  city?: string;
  watch_id: number;
  user_iduser: number;
  stripe_session_id?: string;
};

const createOrderHeader = async (userId: number): Promise<number> => {
  const [result] = await databaseClient.execute<ResultSetHeader>(
    `INSERT INTO order_archive (user_saler_id, user_order_id, price, purchase_date, user_iduser)
     VALUES (?, ?, 0, NOW(), ?)`,
    [userId, userId, userId],
  );
  return result.insertId;
};

const addItem = async (item: OrderArchiveItem) => {
  const {
    idorder,
    user_saler_id,
    user_order_id,
    price,
    purchase_date,
    street_number,
    street,
    zip_code,
    city,
    watch_id,
    user_iduser,
    stripe_session_id,
  } = item;

  const [result] = await databaseClient.execute<ResultSetHeader>(
    `INSERT INTO order_archive
      (idorder, user_saler_id, user_order_id, price, purchase_date, street_number, street, zip_code, city, watch_id, user_iduser, stripe_session_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      idorder ?? null,
      user_saler_id ?? null,
      user_order_id ?? null,
      price ?? null,
      purchase_date ?? new Date(),
      street_number ?? null,
      street ?? null,
      zip_code ?? null,
      city ?? null,
      watch_id ?? null,
      user_iduser ?? null,
      stripe_session_id ?? null,
    ],
  );

  return result;
};

interface OrderIdRow extends RowDataPacket {
  idorder: number;
}

//  pour vérifier si une commande existe déjà
const findBySessionId = async (sessionId: string) => {
  const [rows] = await databaseClient.query<OrderIdRow[]>(
    "SELECT idorder FROM order_archive WHERE stripe_session_id = ? LIMIT 1",
    [sessionId],
  );

  return rows[0] ?? null;
};

export default { createOrderHeader, addItem, findBySessionId };
