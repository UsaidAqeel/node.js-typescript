import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "src/constant";

export const verifyJWT = (token: string, next: NextFunction): any => {
  try {
    const decodeJWT: any = jwt.verify(token, JWT_SECRET_KEY);

    if (!decodeJWT) {
      const err = new Error("Invalid token");
      err.statusCode = 401;
      next(err);
    }
    return decodeJWT?.user;
  } catch (error) {
    const err = new Error("Invalid token");
    err.statusCode = 401;
    next(err);
  }
};

export const generateJWT = (user: Record<string, any>): string => {
  return jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "1h" });
};
