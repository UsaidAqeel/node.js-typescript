import express from "express";
import { registerUserController } from "./user.controller";
import { loginValidator, userValidator } from "./user.middleware";

const userRouter = express.Router();

userRouter.route("/register").post(userValidator, registerUserController);
userRouter.route("/login").post(loginValidator);

export default userRouter;
