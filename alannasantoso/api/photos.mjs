// /api/photos.js
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

// Define Photo model inline (can't import .ts files in serverless functions)
const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, required: true },
    filter: { type: String, required: true },
  },
  { timestamps: true }
);

// Use existing model if already compiled, otherwise create new one
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

// Initialize global mongoose cache
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// MongoDB connection cache
let cached = global.mongoose;

async function connectToDB() {
  if (cached?.conn) return cached.conn;
  
  if (!cached?.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined");
    }
    
    const opts = {
      bufferCommands: false,
    };
    
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
      .then((mongoose) => mongoose);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

// API handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to MongoDB
  try {
    await connectToDB();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }

  // POST - upload photo
  if (req.method === "POST") {
    try {
      const { image, caption, filter } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image is required" });
      }

      const upload = await cloudinary.uploader.upload(image, { 
        folder: "photobooth" 
      });
      
      const photo = await Photo.create({
        url: upload.secure_url,
        caption,
        filter,
      });
      
      return res.status(200).json(photo);
    } catch (err) {
      console.error("Upload failed:", err);
      return res.status(500).json({ 
        error: "Failed to upload photo",
        details: err.message 
      });
    }
  }

  // GET - fetch photos
  if (req.method === "GET") {
    try {
      const photos = await Photo.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(photos);
    } catch (err) {
      console.error("Failed to fetch photos:", err);
      return res.status(500).json({ 
        error: "Failed to fetch photos",
        details: err.message 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ 
    error: `Method ${req.method} Not Allowed` 
  });
}