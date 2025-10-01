// /api/photos.js

import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Photo from "../src/models/Photo.ts"; // adjust path if needed


if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
// --------------------
// Configure Cloudinary
// --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// --------------------
// MongoDB connection cache
// --------------------
let cached = global.mongoose;

async function connectToDB() {
  if (cached?.conn) return cached.conn;
  if (!cached?.promise) {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined");
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// --------------------
// API handler
// --------------------
export default async function handler(req, res) {
  // Connect to MongoDB
  try {
    await connectToDB();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }

  // --------------------
  // POST - upload photo
  // --------------------
  if (req.method === "POST") {
    let body = {};
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { image, caption, filter } = body;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    try {
      const upload = await cloudinary.uploader.upload(image, { folder: "photobooth" });

      const photo = await Photo.create({
        url: upload.secure_url,
        caption,
        filter,
      });

      return res.status(200).json(photo);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return res.status(500).json({ error: "Failed to upload photo" });
    }
  }

  // --------------------
  // GET - fetch photos
  // --------------------
  if (req.method === "GET") {
    try {
      const photos = await Photo.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(photos);
    } catch (err) {
      console.error("Failed to fetch photos:", err);
      return res.status(500).json({ error: "Failed to fetch photos" });
    }
  }

  // --------------------
  // Method not allowed
  // --------------------
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
