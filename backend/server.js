import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import featuredRoutes from "./routes/featuredRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import aboutAuthorRoutes from "./routes/aboutAuthorRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
import fileRoutes from "./routes/fileRoutes.js";
import connectDB from './db/db.js'; // adjust path as needed
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const UPLOADS_DIR = "./uploads";

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
  console.log(`Created uploads folder: ${UPLOADS_DIR}`);
}

app.use("/api/featured", featuredRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/authors", aboutAuthorRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/files", fileRoutes);

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log(" MongoDB Connected");
//     app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
//   })
//   .catch((err) => console.error(" MongoDB Error:", err));


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});