const dotenv = require("dotenv");
dotenv.config();

console.log("🟢 Backend starting...");
console.log("Node version:", process.version);
console.log("PORT:", process.env.PORT);

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import photosRouter from "./routes/photos";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); 



mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.use("/api/photos", photosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
