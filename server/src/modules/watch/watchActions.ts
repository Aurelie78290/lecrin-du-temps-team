import type { RequestHandler } from "express";

import photoRepository from "../photo/photoRepository";
// Import access to data
import watchRepository from "./watchRepository";
//Type
interface UploadedFiles {
  watch_image?: Express.Multer.File[];
  certificate_image?: Express.Multer.File[];
}

// =======================
// B - Browse (Read All)
// =======================
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const watches = await watchRepository.readAll();
    res.json(watches);
  } catch (err) {
    next(err);
  }
};

const browseShop: RequestHandler = async (_req, res, next) => {
  try {
    const watches = await watchRepository.readAll(); // readAll filtre SHOP
    res.json(watches);
  } catch (err) {
    next(err);
  }
};

const browseCollection: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      res.sendStatus(400);
      return;
    }

    const watches = await watchRepository.readAllCollection(userId);
    res.json(watches);
  } catch (err) {
    next(err);
  }
};

// =======================
// R - Read (Read One)
// =======================
const read: RequestHandler = async (req, res, next) => {
  try {
    const watchId = Number(req.params.id);

    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    const watch = await watchRepository.read(watchId);

    if (watch == null) {
      res.sendStatus(404);
    } else {
      res.json(watch);
    }
  } catch (err) {
    next(err);
  }
};

// =======================
// A - Add (Create)
// =======================
const add: RequestHandler = async (req, res, next) => {
  try {
    // 1. Récupérer les fichiers uploadés
    const files = req.files as UploadedFiles;

    // userId (collection) : on le lit une fois
    const userId =
      req.body.userId != null
        ? Number(req.body.userId)
        : req.body.user_id != null
          ? Number(req.body.user_id)
          : null;
    // 2. Créer la montre d'abord
    const newWatch = {
      user_id: req.body.user_id ? Number(req.body.user_id) : null,
      brand_id: Number(req.body.brand_id),
      model_id: Number(req.body.model_id),
      watch_price: req.body.watch_price ? Number(req.body.watch_price) : null,
      watch_condition: req.body.watch_condition || null,
    };

    // Validation minimale
    if (!newWatch.brand_id || !newWatch.model_id) {
      res.status(400).json({ message: "brand_id et model_id sont requis" });
      return;
    }

    // 3. Insérer la montre en base et récupérer son ID
    const watchId = await watchRepository.create(newWatch);

    if (userId != null && !Number.isNaN(userId)) {
      await watchRepository.addToCollection(userId, watchId);
    }
    // 4. Si une image de montre est uploadée, l'enregistrer
    if (files?.watch_image?.[0]) {
      const url = `/uploads/watches/${files.watch_image[0].filename}`;
      await photoRepository.create(url, "watch", watchId);
    }

    // 5. Si un certificat est uploadé, l'enregistrer
    if (files?.certificate_image?.[0]) {
      const url = `/uploads/certificates/${files.certificate_image[0].filename}`;
      await photoRepository.create(url, "certificate", watchId);
    }

    if (userId != null && Number.isFinite(userId)) {
      await watchRepository.addToCollection(userId, watchId);
    }
    res.status(201).json({ insertId: watchId });
  } catch (err) {
    next(err);
  }
};

// =======================
// U - Update (Edit)
// =======================
const update: RequestHandler = async (req, res, next) => {
  try {
    const watchId = Number(req.params.id);
    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    const files = req.files as UploadedFiles | undefined;

    // Construire un objet "updates" (on n'écrase pas avec null si champ absent)
    const updates: Record<string, unknown> = {};

    // champs numériques
    if (req.body.brand_id !== undefined && req.body.brand_id !== "") {
      const n = Number(req.body.brand_id);
      if (!Number.isNaN(n)) updates.brand_id = n;
    }

    if (req.body.model_id !== undefined && req.body.model_id !== "") {
      const n = Number(req.body.model_id);
      if (!Number.isNaN(n)) updates.model_id = n;
    }

    if (req.body.watch_price !== undefined) {
      if (req.body.watch_price === "") {
        updates.watch_price = null;
      } else {
        const n = Number(req.body.watch_price);
        updates.watch_price = Number.isNaN(n) ? null : n;
      }
    }

    // champs texte
    if (req.body.watch_condition !== undefined)
      updates.watch_condition =
        req.body.watch_condition === "" ? null : req.body.watch_condition;

    if (req.body.watch_sell_status !== undefined)
      updates.watch_sell_status =
        req.body.watch_sell_status === "" ? null : req.body.watch_sell_status;

    if (req.body.ref_no !== undefined)
      updates.ref_no = req.body.ref_no === "" ? null : req.body.ref_no;

    // date (string "YYYY-MM-DD")
    if (req.body.production_year !== undefined)
      updates.production_year =
        req.body.production_year === "" ? null : req.body.production_year;

    // tinyint
    if (req.body.is_limited_edition !== undefined)
      updates.is_limited_edition = Number(req.body.is_limited_edition) ? 1 : 0;

    if (req.body.edition_number !== undefined) {
      if (req.body.edition_number === "") {
        updates.edition_number = null;
      } else {
        const n = Number(req.body.edition_number);
        updates.edition_number = Number.isNaN(n) ? null : n;
      }
    }

    // S'il n'y a aucun champ et aucune image → rien à faire
    const hasNewWatchImage = !!files?.watch_image?.[0];
    const hasNewCertImage = !!files?.certificate_image?.[0];

    if (
      Object.keys(updates).length === 0 &&
      !hasNewWatchImage &&
      !hasNewCertImage
    ) {
      res.status(400).json({ message: "Aucun champ à modifier" });
      return;
    }

    // 1) Update des champs watch
    if (Object.keys(updates).length > 0) {
      const updated = await watchRepository.updateById(watchId, updates);
      if (!updated) {
        res.sendStatus(404);
        return;
      }
    } else {
      // si pas de champs, on vérifie que la watch existe quand même
      const existing = await watchRepository.read(watchId);
      if (!existing) {
        res.sendStatus(404);
        return;
      }
    }

    // 2) Update photos (stratégie simple : on ajoute une nouvelle photo)
    // Si tu veux "remplacer", dis-moi et je te mets delete + insert.
    const watchFile = files?.watch_image?.[0];
    if (watchFile) {
      const url = `/uploads/watches/${watchFile.filename}`;
      await photoRepository.create(url, "watch", watchId);
    }

    const certFile = files?.certificate_image?.[0];
    if (certFile) {
      const url = `/uploads/certificates/${certFile.filename}`;
      await photoRepository.create(url, "certificate", watchId);
    }

    // 3) Retourner la watch fraîche
    const fresh = await watchRepository.read(watchId);
    res.status(200).json(fresh);
  } catch (err) {
    next(err);
  }
};

// =======================
// D - Destroy (Delete)
// =======================
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const watchId = Number(req.params.id);
    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    // 1) supprimer ce qui bloque les FK
    await watchRepository.deleteOrderArchiveByWatchId(watchId);
    await photoRepository.deleteByWatchId(watchId);

    // 2) supprimer la watch
    const deleted = await watchRepository.deleteById(watchId);

    if (!deleted) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// =======================
// Remove from collection (unlink only)
// =======================
const removeFromCollection: RequestHandler = async (req, res, next) => {
  try {
    const watchId = Number(req.params.watchId);
    const userId = Number(req.query.userId); // ?userId=1

    if (Number.isNaN(watchId) || Number.isNaN(userId)) {
      res.status(400).json({ message: "userId et watchId requis" });
      return;
    }

    await watchRepository.removeFromCollection(userId, watchId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
  update,
  destroy,
  browseShop,
  browseCollection,
  removeFromCollection,
};
