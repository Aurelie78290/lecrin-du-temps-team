import type { Request, RequestHandler, Response } from "express";

import photoRepository from "../photo/photoRepository";
import watchRepository from "./watchRepository";

interface UploadedFiles {
  watch_image?: Express.Multer.File[];
  certificate_image?: Express.Multer.File[];
}

type WatchWithStatus = { watch_sell_status?: string | null };

type AuthedRequest = Request & { user?: { id: number; role: string } };

const getUserIdOr401 = (req: Request, res: Response): number | null => {
  const userId = (req as AuthedRequest).user?.id;
  if (!userId) {
    res.sendStatus(401);
    return null;
  }
  return userId;
};

const isToValidate = (s?: string | null) =>
  (s ?? "").toLowerCase().replace("à", "a").trim() === "a valider";

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
      user_id: userId,
      watch_price: req.body.watch_price ? Number(req.body.watch_price) : null,
      watch_condition: req.body.watch_condition || null,
      watch_sell_status: "personal",
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
    const current = await watchRepository.read(watchId);
    if (!current) {
      res.sendStatus(404);
      return;
    }

    if (isToValidate((current as WatchWithStatus).watch_sell_status)) {
      res.status(403).json({
        message: "Modification interdite : montre en cours de validation",
      });
      return;
    }
    const files = req.files as UploadedFiles | undefined;

    // Helpers: multer => tout arrive en string
    const setStringOrNull = (key: string, value: unknown) => {
      if (value === undefined) return;
      updates[key] = value === "" ? null : value;
    };

    const setNumberOrNull = (key: string, value: unknown) => {
      if (value === undefined) return;
      if (value === "") {
        updates[key] = null;
        return;
      }
      const n = Number(value);
      updates[key] = Number.isNaN(n) ? null : n;
    };

    const setIdOrNull = (key: string, value: unknown) => {
      // même logique que number, mais utile sémantiquement
      setNumberOrNull(key, value);
    };

    const updates: Record<string, unknown> = {};

    // ---------- REQUIRED IDS (peuvent être changés) ----------
    // On accepte brand/model si envoyés (ton front les envoie toujours)
    if (req.body.brand_id !== undefined && req.body.brand_id !== "") {
      const n = Number(req.body.brand_id);
      if (!Number.isNaN(n) && n > 0) updates.brand_id = n;
    }
    if (req.body.model_id !== undefined && req.body.model_id !== "") {
      const n = Number(req.body.model_id);
      if (!Number.isNaN(n) && n > 0) updates.model_id = n;
    }

    // ---------- BASE ----------
    setNumberOrNull("watch_price", req.body.watch_price);
    setStringOrNull("watch_condition", req.body.watch_condition);
    setStringOrNull("watch_sell_status", req.body.watch_sell_status);
    setStringOrNull("watch_gender", req.body.watch_gender);

    // ---------- GENERAL ----------
    setStringOrNull("ref_no", req.body.ref_no);
    setStringOrNull("production_year", req.body.production_year);

    if (req.body.is_limited_edition !== undefined) {
      // ton front envoie "1"/"0"
      updates.is_limited_edition = Number(req.body.is_limited_edition) ? 1 : 0;
    }

    setNumberOrNull("edition_number", req.body.edition_number);

    // ---------- CARACTERISTIQUES ----------
    setIdOrNull("case_material_id", req.body.case_material_id);
    setNumberOrNull("diameter_mm", req.body.diameter_mm);
    setNumberOrNull("thickness_mm", req.body.thickness_mm);
    setNumberOrNull("water_resistance_bar", req.body.water_resistance_bar);

    setStringOrNull("dial_color", req.body.dial_color);
    setIdOrNull("dial_finish_id", req.body.dial_finish_id);
    setIdOrNull("hour_marker_type_id", req.body.hour_marker_type_id);

    // ---------- BRACELET ----------
    setIdOrNull("strap_material_id", req.body.strap_material_id);
    setStringOrNull("strap_color", req.body.strap_color);
    setIdOrNull("clasp_type_id", req.body.clasp_type_id);
    setNumberOrNull("lug_width_mm", req.body.lug_width_mm);

    // ---------- MOUVEMENT ----------
    setIdOrNull("movement_type_id", req.body.movement_type_id);
    setStringOrNull("caliber", req.body.caliber);
    setIdOrNull("functions_id", req.body.functions_id);
    setNumberOrNull("power_reserve_hours", req.body.power_reserve_hours);
    setNumberOrNull("frequency_hz", req.body.frequency_hz);
    setNumberOrNull("jewel_count", req.body.jewel_count);

    // ---------- CERTIFICAT (lookup) ----------
    setIdOrNull("certificate_id", req.body.certificate_id);

    // ---------- FILES ----------
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

    // 1) update DB (si champs)
    if (Object.keys(updates).length > 0) {
      const updated = await watchRepository.updateById(watchId, updates);
      if (!updated) {
        res.sendStatus(404);
        return;
      }
    } else {
      // juste pour vérifier existence si on upload seulement
      const existing = await watchRepository.read(watchId);
      if (!existing) {
        res.sendStatus(404);
        return;
      }
    }

    // 2) upload photos (si présentes)
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

    // 3) renvoyer l'objet frais
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
    const current = await watchRepository.read(watchId);
    if (!current) {
      res.sendStatus(404);
      return;
    }

    if (isToValidate((current as WatchWithStatus).watch_sell_status)) {
      res.status(403).json({
        message: "Suppression interdite : montre en cours de validation",
      });
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
    const current = await watchRepository.read(watchId);
    if (!current) {
      res.sendStatus(404);
      return;
    }

    if (isToValidate((current as WatchWithStatus).watch_sell_status)) {
      res.status(403).json({
        message: "Action interdite : montre en cours de validation",
      });
      return;
    }
    await watchRepository.removeFromCollection(userId, watchId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// =======================
// mettre en vente - demande d'approbation
// =======================
const requestSellApproval: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const watchId = Number(req.params.id);
    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    const updated = await watchRepository.updateById(watchId, {
      watch_sell_status: "pending",
    });

    if (!updated) {
      res.sendStatus(404);
      return;
    }

    const fresh = await watchRepository.read(watchId);
    res.status(200).json(fresh);
  } catch (err) {
    next(err);
  }
};

// =======================
// annuler une demande de mise en vente (retire "A valider")
// =======================
const cancelSellApproval: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const watchId = Number(req.params.id);
    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    const current = await watchRepository.read(watchId);
    if (!current) {
      res.sendStatus(404);
      return;
    }

    if (!isToValidate((current as WatchWithStatus).watch_sell_status)) {
      res
        .status(400)
        .json({ message: "La montre n'est pas en attente de validation" });
      return;
    }

    const updated = await watchRepository.updateById(watchId, {
      watch_sell_status: null,
    });

    if (!updated) {
      res.sendStatus(404);
      return;
    }

    const fresh = await watchRepository.read(watchId);
    res.status(200).json(fresh);
  } catch (err) {
    next(err);
  }
};
// =======================
// annuler une mise en vente
// =======================
const removeFromSale: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserIdOr401(req, res);
    if (!userId) return;

    const watchId = Number(req.params.id);
    if (Number.isNaN(watchId)) {
      res.sendStatus(400);
      return;
    }

    const current = await watchRepository.read(watchId);
    if (!current) {
      res.sendStatus(404);
      return;
    }

    if ((current as WatchWithStatus).watch_sell_status !== "En vente") {
      res.status(400).json({ message: "La montre n'est pas en vente" });
      return;
    }

    const updated = await watchRepository.updateById(watchId, {
      watch_sell_status: null,
    });

    if (!updated) {
      res.sendStatus(404);
      return;
    }

    const fresh = await watchRepository.read(watchId);
    res.status(200).json(fresh);
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
  requestSellApproval,
  cancelSellApproval,
  removeFromSale,
};
