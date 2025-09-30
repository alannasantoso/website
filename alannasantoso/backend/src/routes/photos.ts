import { Router } from "express";
import * as Photo from "../models/Photo";

const cloudinary = require("../config/cloudinary");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { image, caption, filter } = req.body;

    if (!image) return res.status(400).json({ error: "Image required" });

    const upload = await cloudinary.uploader.upload(image, {
      folder: "photobooth",
    });

    const photo = await Photo.create({
url: upload.secure_url,
      caption,
      filter,
    });

    res.json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload photo" });
  }
});

router.get("/", async (_req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });
  res.json(photos);
});

export default router;
