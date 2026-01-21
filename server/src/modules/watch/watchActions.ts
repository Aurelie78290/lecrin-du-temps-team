import type { Request, RequestHandler, Response } from "express";

import photoRepository from "../photo/photoRepository";
import watchRepository from "./watchRepository";

interface UploadedFiles {
  watch_image?: Express.Multer.File[];
  certificate_image?: Express.Multer.File[];
}

type AuthedRequest = Request & { user?: { id: number; role: string } };

const getUserIdOr401 = (req: Request, res: Response): number | null => {
  const userId = (req as AuthedRequest).user?.id;
  if (!userId) {
    res.sendStatus(401);
    return null;
  }
  return userId;
};

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
    const watches = await watchRepository.readAll(); // si tu filtres SHOP ici, ok
    res.json(watches);
  } catch (err) {
    next(err);
  }
};

// ✅ collection du user connecté (plus de :userId dans l’URL)
const browseCollection: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const watches = await watchRepository.readAllCollection(userId);
    res.json(watches);
  } catch (err) {
    next(err);
  }
};

// Action pour récuperer les montres des users pour le tableau admin //
const browseForAdmin: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
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
      return;
    }

    res.json(watch);
  } catch (err) {
    next(err);
  }
};

// =======================
// A - Add (Create)
// =======================
const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const files = req.files as UploadedFiles | undefined;

    const brandId = Number(req.body.brand_id);
    const modelId = Number(req.body.model_id);

    if (
      Number.isNaN(brandId) ||
      Number.isNaN(modelId) ||
      !brandId ||
      !modelId
    ) {
      res.status(400).json({ message: "brand_id et model_id sont requis" });
      return;
    }

    const newWatch = {
      brand_id: brandId,
      model_id: modelId,
      watch_price: req.body.watch_price ? Number(req.body.watch_price) : null,
      watch_condition: req.body.watch_condition || null,
    };

    // 1) créer la montre
    const watchId = await watchRepository.create(newWatch);

    // 2) l’ajouter à la collection du user connecté
    await watchRepository.addToCollection(userId, watchId);

    // 3) photos
    if (files?.watch_image?.[0]) {
      const url = `/uploads/watches/${files.watch_image[0].filename}`;
      await photoRepository.create(url, "watch", watchId);
    }

    if (files?.certificate_image?.[0]) {
      const url = `/uploads/certificates/${files.certificate_image[0].filename}`;
      await photoRepository.create(url, "certificate", watchId);
    }

    res.status(201).json({ insertId: watchId });
  } catch (err) {
    next(err);
  }
};

const getCollectionStats: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const data = await watchRepository.getCollectionValueOverTime(userId);

    res.json(data);
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

    const updates: Record<string, unknown> = {};

    if (req.body.brand_id !== undefined && req.body.brand_id !== "") {
      const n = Number(req.body.brand_id);
      if (!Number.isNaN(n)) updates.brand_id = n;
    }

    if (req.body.model_id !== undefined && req.body.model_id !== "") {
      const n = Number(req.body.model_id);
      if (!Number.isNaN(n)) updates.model_id = n;
    }

    if (req.body.watch_price !== undefined) {
      if (req.body.watch_price === "") updates.watch_price = null;
      else {
        const n = Number(req.body.watch_price);
        updates.watch_price = Number.isNaN(n) ? null : n;
      }
    }

    if (req.body.watch_condition !== undefined)
      updates.watch_condition =
        req.body.watch_condition === "" ? null : req.body.watch_condition;

    if (req.body.watch_sell_status !== undefined)
      updates.watch_sell_status =
        req.body.watch_sell_status === "" ? null : req.body.watch_sell_status;

    if (req.body.ref_no !== undefined)
      updates.ref_no = req.body.ref_no === "" ? null : req.body.ref_no;

    if (req.body.production_year !== undefined)
      updates.production_year =
        req.body.production_year === "" ? null : req.body.production_year;

    if (req.body.is_limited_edition !== undefined)
      updates.is_limited_edition = Number(req.body.is_limited_edition) ? 1 : 0;

    if (req.body.edition_number !== undefined) {
      if (req.body.edition_number === "") updates.edition_number = null;
      else {
        const n = Number(req.body.edition_number);
        updates.edition_number = Number.isNaN(n) ? null : n;
      }
    }

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

    if (Object.keys(updates).length > 0) {
      const updated = await watchRepository.updateById(watchId, updates);
      if (!updated) {
        res.sendStatus(404);
        return;
      }
    } else {
      const existing = await watchRepository.read(watchId);
      if (!existing) {
        res.sendStatus(404);
        return;
      }
    }

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

    await watchRepository.deleteOrderArchiveByWatchId(watchId);
    await photoRepository.deleteByWatchId(watchId);

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
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const watchId = Number(req.params.watchId);
    if (Number.isNaN(watchId)) {
      res.status(400).json({ message: "watchId requis" });
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
  getCollectionStats,
  browseForAdmin,
};
