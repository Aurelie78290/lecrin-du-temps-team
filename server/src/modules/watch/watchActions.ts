import type { RequestHandler } from "express";

// Import access to data
import watchRepository from "./watchRepository";
import photoRepository from "../photo/photoRepository";

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

    res.status(201).json({ insertId: watchId });
  } catch (err) {
    next(err);
  }
};
export default {
  browse,
  read,
  add,
};
