import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  role: string;
}

// Pour récupere le cookie appelé "token" //
const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    res.sendStatus(401); // pas de token pas d'accès //
    return;
  }

  try {
    const secret = process.env.APP_SECRET;
    if (!secret) {
      throw new Error("APP_SECRET is not defined");
    }

    // Décodage du token //
    const decoded = jwt.verify(token, secret) as UserPayload;

    // on met les infos du user dans le req pour les prochaines actions //
    (req as Request & { user: UserPayload }).user = decoded;

    next();
  } catch (err) {
    res.clearCookie("token");
    res.sendStatus(401);
  }
};

export default isAuth;
