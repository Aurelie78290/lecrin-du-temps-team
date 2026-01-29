import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

// Types
type PhotoType = "watch" | "certificate";

interface Photo {
  id: number;
  url: string;
  type: PhotoType;
  watch_id: number;
}

class PhotoRepository {
  /**
   * Ajoute une photo liée à une montre
   * @param url - Chemin vers l'image (ex: "/uploads/watches/123456.jpg")
   * @param type - Type de photo ("watch" ou "certificate")
   * @param watchId - ID de la montre associée
   * @returns L'ID de la photo créée
   */
  async create(url: string, type: PhotoType, watchId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO photo (url, type, watch_id) VALUES (?, ?, ?)",
      [url, type, watchId],
    );
    return result.insertId;
  }

  /**
   * Récupère toutes les photos d'une montre
   * @param watchId - ID de la montre
   * @returns Liste des photos
   */
  async findByWatchId(watchId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, url, type, watch_id FROM photo WHERE watch_id = ?",
      [watchId],
    );
    return rows as {
      id: number;
      url: string;
      type: string;
      watch_id: number;
    }[];
  }

  async findById(photoId: number): Promise<Photo | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, url, type, watch_id FROM photo WHERE id = ? LIMIT 1",
      [photoId],
    );
    const list = rows as Photo[];
    return list[0] ?? null;
  }
  /**
   * Vérifie si une montre a au moins une photo de type "watch"
   */
  async hasWatchPhoto(watchId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT 1 FROM photo WHERE watch_id = ? AND type = 'watch' LIMIT 1",
      [watchId],
    );

    return (rows as unknown[]).length > 0;
  }
  async deleteByWatchId(watchId: number) {
    await databaseClient.query("DELETE FROM photo WHERE watch_id = ?", [
      watchId,
    ]);
  }

  async deleteById(photoId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM photo WHERE id = ?",
      [photoId],
    );
    return result.affectedRows > 0;
  }
}

export default new PhotoRepository();
