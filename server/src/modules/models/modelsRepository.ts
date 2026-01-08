import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Models {
  id: number;
  name: string;
  brand_id: string;
}

class modelsRepository {
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
    const [rows] = await databaseClient.query<Rows & Models[]>(
      `
      SELECT brand_id, name, id FROM model ORDER BY name;
        
      `,
    );

    return rows as Models[];
  }
}

export default new modelsRepository();
