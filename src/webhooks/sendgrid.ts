// Webhook for SendGrid

import { Response, Request } from "express";

export const sendGridWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = req.body;

    if (!Array.isArray(events)) {
      throw new Error("Invalid request body: Expected an array of events");
    }

    

  } catch (error) {
    console.error("Error in sendGridWebhook", error);
    res.status(500).send("Internal Server Error");
  }
};
