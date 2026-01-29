import multer from "multer";
import path from "node:path";

// ============================================
// CONFIGURATION DES DOSSIERS DE DESTINATION
// ============================================

/**
 * Chemins absolus vers les dossiers d'upload.
 * - process.cwd() retourne le dossier depuis lequel le serveur est lancé
 * - path.join() assemble les chemins de manière cross-platform (/ sur Mac/Linux, \ sur Windows)
 */
const watchesDir = path.join(process.cwd(), "public/assets/uploads/watches");
const certificatesDir = path.join(
  process.cwd(),
  "public/assets/uploads/certificates",
);
const profileDir = path.join(
  process.cwd(),
  "public/assets/uploads/profilepictures",
);

// ============================================
// CONFIGURATION DU STOCKAGE (diskStorage)
// ============================================

/**
 * Définit où et comment stocker les fichiers uploadés.
 * - destination : choisit le dossier selon le type de fichier
 * - filename : génère un nom unique pour éviter les conflits
 */
const storage = multer.diskStorage({
  /**
   * Détermine le dossier de destination selon le champ du formulaire.
   * @param req - La requête HTTP
   * @param file - Informations sur le fichier (fieldname, mimetype, etc.)
   * @param cb - Callback : cb(erreur, cheminDuDossier)
   */
  destination: (req, file, cb) => {
    if (file.fieldname === "watch_image") {
      cb(null, watchesDir);
    } else if (file.fieldname === "certificate_image") {
      cb(null, certificatesDir);
    } else if (file.fieldname === "photo") {
      cb(null, profileDir);
    } else {
      cb(null, watchesDir); // Par défaut
    }
  },

  /**
   * Génère un nom de fichier unique.
   * Format : [timestamp]-[nombreAléatoire].[extension]
   * Exemple : 1767950123456-123456789.jpg
   * @param req - La requête HTTP
   * @param file - Informations sur le fichier
   * @param cb - Callback : cb(erreur, nomDuFichier)
   */
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname); // Récupère l'extension (.jpg, .png, etc.)
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// ============================================
// FILTRE DES TYPES DE FICHIERS
// ============================================

/**
 * Vérifie que le fichier est bien une image autorisée.
 * Accepte : JPEG, PNG, WebP
 * Rejette : tous les autres formats (PDF, EXE, etc.)
 * @param req - La requête HTTP
 * @param file - Informations sur le fichier
 * @param cb - Callback : cb(erreur) pour rejeter, cb(null, true) pour accepter
 */
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accepte le fichier
  } else {
    cb(new Error("Format non autorisé. Utilisez JPG, PNG ou WebP."));
  }
};

// ============================================
// EXPORT DU MIDDLEWARE MULTER CONFIGURÉ
// ============================================

/**
 * Middleware multer prêt à l'emploi.
 * - storage : notre configuration de stockage
 * - fileFilter : notre filtre de types
 * - limits.fileSize : taille max de 5 MB par fichier
 *
 * Utilisation dans les routes :
 * upload.fields([
 *   { name: "watch_image", maxCount: 1 },
 *   { name: "certificate_image", maxCount: 1 },
 * ])
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB en octets
  },
});
