import { Router } from "express";
import { getAllEmailLogsController } from "./emailLogs.controller";
import { authGuard } from "src/common/middlewares/auth";

export const emailLogRouter = Router();

emailLogRouter.route("/email-logs").get(authGuard, getAllEmailLogsController);
