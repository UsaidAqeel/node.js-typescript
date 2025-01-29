import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "src/libs/jwt";

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const error = new Error("Authorization header is missing");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Token is missing");
    error.statusCode = 401;
    return next(error);
  }

  req.token = token;
  req.user = verifyJWT(token, next);
  next();
};
