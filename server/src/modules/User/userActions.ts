import type { Request, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    // Récuperer le user //
    const user = await userRepository.findByEmail(email);
    if (user == null || !user.password) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }

    // Comparaison du MDP avec BCRYPT //
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }

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
      sameSite: "strict",
      maxAge: 3600000, // pour 1h //
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
    const { firstname, lastname, email, birthdate, tel } = req.body;
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    await userRepository.update({
      id: userId,
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      role: "",
      birthdate: birthdate || null,
      tel: tel || null,
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

export default { login, checkAuth, add, edit, logout };
