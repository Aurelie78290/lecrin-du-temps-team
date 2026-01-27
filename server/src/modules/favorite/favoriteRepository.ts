import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class FavoriteRepository {
  async getFavoriteIds(userId: number): Promise<number[]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT watch_idwatch FROM is_favorite WHERE user_iduser = ?",
      [userId],
    );
    return rows.map((r) => r.watch_idwatch as number);
  }

  async isFavorite(userId: number, watchId: number): Promise<boolean> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT 1 FROM is_favorite WHERE user_iduser = ? AND watch_idwatch = ?",
      [userId, watchId],
    );
    return rows.length > 0;
  }

  async addFavorite(userId: number, watchId: number): Promise<void> {
    await databaseClient.query(
      "INSERT IGNORE INTO is_favorite (user_iduser, watch_idwatch) VALUES (?, ?)",
      [userId, watchId],
    );
  }

  async removeFavorite(userId: number, watchId: number): Promise<void> {
    await databaseClient.query(
      "DELETE FROM is_favorite WHERE user_iduser = ? AND watch_idwatch = ?",
      [userId, watchId],
    );
  }
}

export default new FavoriteRepository();
