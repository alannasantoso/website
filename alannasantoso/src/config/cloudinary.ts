// /src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

// No need for dotenv here if running in Vercel serverless functions;
// process.env will already contain your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;
