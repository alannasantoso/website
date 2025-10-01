// src/models/Photo.ts
import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, required: true },
    filter: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model("Photo", photoSchema);
