import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Watch = {
  idwatch: number;
  user_id: number | null;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition: string | null;

  url_photo1?: string;
  url_photo2?: string;
  url_photo3?: string;
  url_photo4?: string;
  url_photo5?: string;
};

class WatchRepository {
  // ======================
  // C - Create
  // ======================
  async create(watch: Omit<Watch, "idwatch">) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO watch (user_id, brand, model, watch_price, photo_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [watch.user_id, watch.brand, watch.model, watch.watch_price, null],
    );

    return result.insertId;
  }

  // ======================
  // R - Read one
  // ======================
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        w.idwatch,
        w.user_id,
        w.brand,
        w.model,
        w.watch_price,
        w.watch_condition,
        p.url_photo1,
        p.url_photo2,
        p.url_photo3,
        p.url_photo4,
        p.url_photo5
      FROM watch w
      LEFT JOIN photo p ON p.idphoto = w.photo_id
      WHERE w.idwatch = ?
      `,
      [id],
    );

    return rows[0] as Watch;
  }

  // ======================
  // R - Read all
  // ======================
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        w.idwatch,
        w.brand,
        w.model,
        w.watch_price,
        w.watch_condition,
        p.url_photo1
      FROM watch w
      LEFT JOIN photo p ON p.idphoto = w.photo_id
      `,
    );

    return rows as Watch[];
  }

  // ======================
  // U - Update (optionnel)
  // ======================
  // async update(watch: Watch) {}

  // ======================
  // D - Delete (optionnel)
  // ======================
  // async delete(id: number) {}
}

export default new WatchRepository();
