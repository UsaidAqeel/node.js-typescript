import mongoose, { Document, Schema } from "mongoose";

export interface IUsers extends Document {
  name: string;
  email: string;
  password?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: "" },
});

export const User = mongoose.model<IUsers>("User", UserSchema);
