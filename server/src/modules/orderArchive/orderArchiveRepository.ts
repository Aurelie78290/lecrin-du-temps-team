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
};

const createOrderHeader = async (userId: number) => {
  const [result] = await databaseClient.execute(
    `INSERT INTO order_archive (user_saler_id, user_order_id, price, purchase_date, watch_id, user_iduser)
     VALUES (?, ?, 0, NOW(), 0, ?)`,
    [userId, userId, userId],
  );
  return result as { insertId: number };
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
      idorder,
      user_saler_id,
      user_order_id,
      price,
      purchase_date ?? new Date(),
      street_number ?? null,
      street ?? null,
      zip_code ?? null,
      city ?? null,
      watch_id,
      user_iduser,
    ],
  );
};

export default { createOrderHeader, addItem };
