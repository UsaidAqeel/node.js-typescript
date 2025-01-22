import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { dbConnect } from "../config/db/db.config";
import userRoutes from "./../modules/users/user.routes";
import morgan from "morgan";

dotenv.config();
const app = express();

dbConnect();

var corsOptions = {
  origin: "*",
};
app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  console.log("error in global: ", message, data);
  res.status(status).json({ message: message, error: true, data: data });
});

export default app;
