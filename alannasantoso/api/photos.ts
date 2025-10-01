// /src/api/photos.ts
/// <reference types="node" />

import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import cloudinary from "../src/config/cloudinary.js";
import Photo from "../src/models/Photo.js";

// --------------------
// MongoDB connection (cached for serverless)
// --------------------
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables.");
    }

    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => {
      console.log("✅ Connected to MongoDB");
      return m.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// --------------------
// API Route Handler
// --------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectToDB();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }

  // Handle POST (upload photo)
  if (req.method === "POST") {
    try {
      const { image, caption, filter } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Image is required" });
      }

      // Upload image to Cloudinary
      const upload = await cloudinary.uploader.upload(image, {
        folder: "photobooth",
      });

      // Save metadata in MongoDB
      const photo = await Photo.create({
        url: upload.secure_url,
        caption,
        filter,
      });

      return res.status(200).json(photo);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      return res.status(500).json({ error: "Failed to upload photo" });
    }
  }

  // Handle GET (fetch photos)
  if (req.method === "GET") {
    try {
      const photos = await Photo.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(photos);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      return res.status(500).json({ error: "Failed to fetch photos" });
    }
  }

  // Unsupported method
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
