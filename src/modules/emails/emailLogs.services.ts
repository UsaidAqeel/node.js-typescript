import { httpStatusCodes } from "src/libs";
import { EmailLogs, IEmailLog } from "./emailLogs.modal";
import { ResponsePacket } from "src/utils";

// Create a new email log
export const createEamilLogService = async (
  emailLog: IEmailLog
): Promise<Record<string, any>> => {
  try {
    const newEmailLog = new EmailLogs(emailLog);
    await newEmailLog.save();

    return newEmailLog;
  } catch (error) {
    console.error("Error in createEamilLogService: ", error);
    throw error;
  }
};

// Get email log by message ID
export const getEmailLogService = async (
  messageId: string
): Promise<IEmailLog | null> => {
  try {
    return EmailLogs.findOne({ messageId });
  } catch (error) {
    console.error("Error in getEmailLogService: ", error);
    throw error;
  }
};

// Update email log by message ID
export const updateEmailLogService = async (
  messageId: string,
  payload: Record<string, any>
): Promise<IEmailLog | null> => {
  try {
    const emailLog = await EmailLogs.findOneAndUpdate(
      { messageId },
      { $set: payload },
      { new: true }
    );
    return emailLog;
  } catch (error) {
    console.error("Error in updateEmailLogService: ", error);
    throw error;
  }
};

// Get all email logs
export const getAllEmailLogsService = async (): Promise<
  Record<string, any>
> => {
  try {
    const emailLogs = await EmailLogs.find();

    return ResponsePacket.success(
      httpStatusCodes.OK,
      "Email logs fetched successfully",
      emailLogs
    );
  } catch (error) {
    console.error("Error in getAllEmailLogsService: ", error);
    return ResponsePacket.failure(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to get email logs. Please try again.",
      null
    );
  }
};
