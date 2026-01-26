import databaseClient from "../../../database/client";

import type { ResultSetHeader } from "mysql2/promise";

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
  } = item;

  await databaseClient.execute(
    `INSERT INTO order_archive
      (idorder, user_saler_id, user_order_id, price, purchase_date, street_number, street, zip_code, city, watch_id, user_iduser)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
    ],
  );
};

export default { createOrderHeader, addItem };
