import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "src/constant";

export const verifyJWT = (token: string, next: NextFunction): any => {
  try {
    const decodeJWT: any = jwt.verify(token, JWT_SECRET_KEY);

    if (!decodeJWT) {
      throw new Error("Invalid token");
    }
    return decodeJWT?.user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateJWT = (user: Record<string, any>): string => {
  return jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "1h" });
};
