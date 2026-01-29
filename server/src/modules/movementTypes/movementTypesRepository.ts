import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type MovementType = {
  id: number;
  movement_type: string;
};

class MovementTypesRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT idmovement_type as id, movement_type FROM movement_type ORDER BY movement_type ASC",
    );
    return rows as MovementType[];
  }
}

export default new MovementTypesRepository();
