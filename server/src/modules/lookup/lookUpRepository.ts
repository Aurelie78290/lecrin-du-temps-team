// modules/lookups/lookupsRepository.ts
import databaseClient from "../../../database/client";

const readBrands = async () => {
  const [rows] = await databaseClient.query(
    "SELECT id, name FROM brand ORDER BY name",
  );
  return rows as { id: number; name: string }[];
};

const readModelsByBrand = async (brandId: number) => {
  const [rows] = await databaseClient.query(
    "SELECT id, name FROM model WHERE brand_id = ? ORDER BY name",
    [brandId],
  );
  return rows as { id: number; name: string }[];
};

const readSimple = async (table: string, idCol: string, nameCol: string) => {
  const sql = `SELECT ${idCol} AS id, ${nameCol} AS name FROM ${table} ORDER BY ${nameCol}`;
  const [rows] = await databaseClient.query(sql);
  return rows as { id: number; name: string }[];
};

export default {
  readBrands,
  readModelsByBrand,
  readSimple,
};
