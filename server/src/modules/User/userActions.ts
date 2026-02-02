import crypto from "node:crypto";
import { get } from "node:http";
import bcrypt from "bcrypt";
import type { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../../services/mailer";
import userRepository from "./userRepository";

// Ajout pour une inscription //
const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, birthdate, tel } = req.body;

    // Check si le mail existe déjà //
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé" });
      return;
    }

    // Hachage du MDP //
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création dans la BDD //
    const result = await userRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
      birthdate,
      tel,
    });

    res.status(201).json({
      id: result.insertId,
      message: "Compte créé",
    });
  } catch (err) {
    next(err);
  }
};

// Pour se connecter //
const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // On récupère le user //
    const user = await userRepository.findByEmail(email);
    if (user == null || !user.password) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }

    // On compare le MDP avec BCRYPT //
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }
    await userRepository.updateLastLogin(user.id); // Met a jour la date de dernière connexion //

    // Pour créer le TOKEN //
    const secret = process.env.APP_SECRET;
    if (!secret) {
      throw new Error("APP_SECRET is not defined");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: "1h",
    });

    // Envoi du cookie sécurisé, donc pas visible coté client //
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Pour éviter les attaques CSRF //
      maxAge: 3600000 * 10, // Pour 10h //
    });

    // Renvoi des infos au front //
    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      birthdate: user.birthdate,
      tel: user.tel,
    });
  } catch (err) {
    next(err);
  }
};

// Pour check si le cookie est toujours bon pour reconnecte le user automatiquement //
const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    // Ici on définit le type de requête via le authMiddleware //
    const authReq = req as typeof req & { user?: { id: number; role: string } };
    const userId = authReq.user?.id;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      res.sendStatus(401);
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

const edit: RequestHandler = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      birthdate,
      tel,
      user_describe,
      street_number,
      street,
      zip_code,
      city,
      user_photo,
    } = req.body;
    const authReq = req as AuthRequest; // On définit le type de requête via le authMiddleware //
    const userId = authReq.user?.id; // Récupère l'ID de l'utilisateur via son token //

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    await userRepository.update({
      id: userId,
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      role: authReq.user?.role || "",
      birthdate: birthdate || null,
      tel: tel || null,
      user_describe: user_describe || null,
      street_number: street_number || null,
      street: street || null,
      zip_code: zip_code || null,
      city: city || null,
      user_photo: user_photo || null,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("token"); // Supprime le cookie //
  res.sendStatus(204);
};

// Pour reset le MDP //

//Demande de réinitilisation //

const forgotPassword: RequestHandler = async (req, res, next) => {
  const { e_mail } = req.body;

  try {
    // On génère un token aleatoire //
    const token = crypto.randomBytes(32).toString("hex");
    // Expiration dans 1h //
    const expiry = new Date(Date.now() + 3600000);
    const result = await userRepository.setResetToken(e_mail, token, expiry);

    // Si le user existe on envoie le mail //
    if (result.affectedRows > 0) {
      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

      const emailHtml = `
      <div style="background-color: #010c2a; padding; 40px; font-family: 'Inter', Arial, sans-serif; color: #ffffff; text-align: center;">
      <div style="max-width: 500px; margin: 0 auto; border: 1px solid #e0c58f; padding: 40px; border-radius: 5px;">
      <h1 style="color: #e0c58f; letter-spacing: 4px; font-weight: 300; text-transform: uppercase; margin-bottom: 30px;">
      L'Écrin du Temps
      </h1> 
      <h2 style="font-size: 20px; font-weight: 400; margin-bottom: 20px;">Récuperation du mot de passe</h2>
      <p style="color: #cccccc; line-height: 1.6; margin-bottom: 30px;">
      Vous avez demandé la réinitialisation de votre mot de passe pour L'Écrin du Temps. Veuillez cliquer sur le bouton ci-dessous.</p>
      <a href="${resetLink}" styl="display: inline-block; background-color: transparent; color: #e0c58f; border: 1px solid #d4af37; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; letter-spacing: 1px;">
       RÉINITIALISER MON MOT DE PASSE
       </a>
       <p style="margin-top: 20px; font-size: 11px; color: #444444; letter-spacing: 1px;">
       &copy; 2026 L'ÉCRIN DU TEMPS - Les montres d'exceptions réunies pour vous
       </p>
       </div>
       `;

      await sendResetPasswordEmail(
        e_mail,
        "Réinitialisation de mot de passe - L'Écrin du Temps",
        emailHtml,
      );
    }
    res.status(200).json({ message: "Un lien a été envoyé." });
  } catch (err) {
    next(err);
  }
};

// Validation du nouveau mot de passe //
const resetPassword: RequestHandler = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    // Cherche le user via le token //
    const user = await userRepository.findByResetToken(token);

    if (!user) {
      res.status(400).json({ message: "le lien est invalide ou a expiré." });
      return;
    }

    // Hachage du nouveau MDP //
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Mise a jour dans la BDD //
    await userRepository.updatePassword(user.id, hashedPassword);
    res.status(200).json({ message: "Votre mot de passe a été réinitialisé." });
  } catch (err) {
    next(err);
  }
};

// Pour récupere le status des montres des users //
const getUserWatchStatus: RequestHandler = async (req, res, next) => {
  try {
    const stats = await userRepository.getUserWatchStatus();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

const getMyOrders: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;

    console.log("recherche des commandes", userId);

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const orders = await userRepository.findOrdersByUserId(userId);
    console.log("commandes trouvées:", orders);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const updatePhoto: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const file = req.file;

    if (!userId || !file) {
      res.status(400).send("Fichier manquant");
      return;
    }

    const photoUrl = `/assets/uploads/profilepictures/${file.filename}`;

    await userRepository.updatePhoto(userId, photoUrl);

    res.status(200).json({ photo_url: photoUrl });
  } catch (err) {
    next(err);
  }
};

const deletePhoto: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    await userRepository.updatePhoto(userId, null as unknown as string);

    res.status(200).json({ message: "Photo supprimée" });
  } catch (err) {
    next(err);
  }
};

export default {
  login,
  checkAuth,
  add,
  edit,
  logout,
  forgotPassword,
  resetPassword,
  getUserWatchStatus,
  getMyOrders,
  updatePhoto,
  deletePhoto,
};
