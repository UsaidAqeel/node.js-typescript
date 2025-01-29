import { NextFunction, Request, Response } from "express";
import { getAllEmailLogsService } from "./emailLogs.services";

export const getAllEmailLogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getAllEmailLogsService();

    res.status(result.code).json(result);
  } catch (error: any) {
    console.log("error in controller: ", error.message);
    next(error);
  }
};
