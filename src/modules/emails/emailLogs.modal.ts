import { Document, model, Schema } from "mongoose";

export interface IEmailLog extends Document {
  from?: string;
  to?: string[];
  cc: string[];
  subject: string;
  html: string;
  date: Date;
  status: string;
  open?: number;
  clicks?: string;
  attachments: Array<Object>;
  messageId?: string;
  events: Array<Object>;
}

const emailLogSchema = new Schema({
  from: { type: String, required: true },
  to: [{ type: String, required: true }],
  cc: [{ type: String, required: true }],
  subject: { type: String, required: true },
  html: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  open: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  attachments: { type: Array, required: false },
  messageId: { type: String },
  events: { type: Array, required: true },
});

export const EmailLogs = model<IEmailLog>("EmailLogs", emailLogSchema);