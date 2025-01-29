import { Router } from "express";
import { getAllEmailLogsController } from "./emailLogs.controller";

export const emailLogRouter = Router();

emailLogRouter.route("/email-logs").get(getAllEmailLogsController);
