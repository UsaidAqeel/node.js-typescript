import { NextFunction, Request, Response } from "express";
import {
  isEmailExistService,
  createUserService,
  loginUserSerivce,
} from "./user.services";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isUserExist = await isEmailExistService(req.body.email, next);

    if (!isUserExist) {
      const user = {
        ...req.body,
      };
      const result = await createUserService(user);

      res.status(result.code).json(result);
    } else {
      const error = new Error("User Already Exist");
      error.statusCode = 403;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isUserExist = await isEmailExistService(req.body.email, next);

    if (!isUserExist) {
      console.log("Invalid Email or Password");
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      return next(error);
    }

    const result = await loginUserSerivce(req.body);

    res.status(result.code).json(result);
  } catch (error: any) {
    console.log("error in loginUserController: ", error.message);
    next(error);
  }
};
