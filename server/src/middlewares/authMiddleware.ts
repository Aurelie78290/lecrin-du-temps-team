import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Interface pour le payload du token //
interface UserPayload {
  id: number;
  role: string;
}

// Pour récupere le cookie appelé "token" //
const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // Middleware d'authentification //
  const token = req.cookies?.token; // Récupération du token dans les cookies //

  if (!token) {
    // Si pas de token //
    res.sendStatus(401); // Pas de token pas d'accès //
    return;
  }

  try {
    const secret = process.env.APP_SECRET; // On récupère la clé secrète //
    if (!secret) {
      // Si pas de clé //
      throw new Error("APP_SECRET is not defined"); // On lance une erreur //
    }

    // Décodage du token //
    const decoded = jwt.verify(token, secret) as UserPayload;

    // On met les infos du user dans le req pour les prochaines actions //
    (req as Request & { user: UserPayload }).user = decoded;

    next(); // Tout est bon on passe à la suite //
  } catch (err) {
    res.clearCookie("token"); // Si le token est invalide on le supprime //
    res.sendStatus(401);
  }
};

export default isAuth;
