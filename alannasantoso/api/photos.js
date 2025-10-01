import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Photo from "../src/models/Photo.js"; // adjust path if needed

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

let cached = global.mongoose;

async function connectToDB() {
  if (cached?.conn) return cached.conn;
  if (!cached?.promise) {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined");
    cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  try {
    await connectToDB();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }

  if (req.method === "POST") {
    try {
      const { image, caption, filter } = req.body;
      if (!image) return res.status(400).json({ error: "Image is required" });

      const upload = await cloudinary.uploader.upload(image, { folder: "photobooth" });
      const photo = await Photo.create({ url: upload.secure_url, caption, filter });
      return res.status(200).json(photo);
    } catch (err) {
      console.error("Upload failed:", err);
      return res.status(500).json({ error: "Failed to upload photo" });
    }
  }

  if (req.method === "GET") {
    try {
      const photos = await Photo.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(photos);
    } catch (err) {
      console.error("Fetch failed:", err);
      return res.status(500).json({ error: "Failed to fetch photos" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
