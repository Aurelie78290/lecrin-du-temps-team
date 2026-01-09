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
      "SELECT id, url, type FROM photo WHERE watch_id = ?",
      [watchId],
    );
    return rows as Photo[];
  }
}

export default new PhotoRepository();
