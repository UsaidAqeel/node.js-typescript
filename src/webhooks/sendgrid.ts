// Webhook for SendGrid

import { Response, Request } from "express";

import {
  getEmailLogService,
  updateEmailLogService,
} from "src/modules/emails/emailLogs.services";

export const sendGridWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = req.body;

    if (!Array.isArray(events)) {
      console.error("Invalid request body: Expected an array of events");
      res.status(400).send("Invalid request body: Expected an array of events");
      return;
    }

    // Iterate over the events
    for (const event of events) {
      const { event: eventAction, sg_message_id } = event;

      // Split the message ID from the SendGrid message ID
      const messageId = sg_message_id?.split(".")[0];

      if (!messageId) {
        console.warn("Invalid message ID format:", sg_message_id);
        res.status(400).send("Invalid message ID format");
        return;
      }

      // Get the email log by message ID 
      const emailLog = await getEmailLogService(messageId);

      if (!emailLog) {
        console.warn("Email log not found:", messageId);
        continue;
      }

      const payload: Record<string, any> = {}; 
       
      // Update the email log based on the event action
      switch (eventAction) {
        case "open":
          payload.open = (Number(emailLog?.open) || 0) + 1;
          break;
        case "click":
          payload.clicks = (Number(emailLog?.clicks) || 0) + 1;
          break;
        case "bounce":
        case "dropped":
        case "delivered":
        case "deferred":
        case "spamreport":
        case "unsubscribe":
          payload.status = eventAction.charAt(0).toUpperCase() + eventAction.slice(1);
          break;
        default:
          console.warn("Unsupported event action:", eventAction);
          continue;
      }

      // Update the email log with the payload
      await updateEmailLogService(messageId, payload);
    }

    res.status(200).send("Webhook processed successfully");
  } catch (error) {
    console.error("Error in sendGridWebhook", error);
    res.status(500).send("Internal Server Error");
  }
};
