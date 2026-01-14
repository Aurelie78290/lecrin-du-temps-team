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
  destroy,
  browseShop,
  browseCollection,
  removeFromCollection, // ✅ AJOUTE ÇA
};
