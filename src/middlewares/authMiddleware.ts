import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET || "";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log(req);
    //req.user = user;
    next();
  });
};
