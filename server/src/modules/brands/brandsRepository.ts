import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Brand {
  id: number;
  name: string;
}

class brandsRepository {
  // ======================
  // C - Create
  // ======================

  // ======================
  // R - Read one (DETAILS)
  // ======================

  // ======================
  // R - Read all (LISTING)
  // ======================
  async readAll() {
    const [rows] = await databaseClient.query<Rows & Brand[]>(
      `
      SELECT id, name FROM brand;
        
      `,
    );

    return rows as Brand[];
  }
}

export default new brandsRepository();
