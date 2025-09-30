import mongoose, { Schema, Document } from "mongoose";

export interface IPhoto extends Document {
  url: string;
  caption: string;
  filter: string;
  createdAt: Date;
}

const PhotoSchema = new Schema<IPhoto>({
  url: { type: String, required: true },
  caption: { type: String, required: false },
  filter: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPhoto>("Photo", PhotoSchema);
