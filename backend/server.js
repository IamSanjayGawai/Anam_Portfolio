// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import featuredRoutes from "./routes/featuredRoutes.js";
// import exploreRoutes from "./routes/exploreRoutes.js";
// import aboutAuthorRoutes from "./routes/aboutAuthorRoutes.js";
// import contactRoutes from './routes/contactRoutes.js';
// import fileRoutes from "./routes/fileRoutes.js";
// import connectDB from './db/db.js'; // adjust path as needed
// import fs from "fs";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const UPLOADS_DIR = "./uploads";

// if (!fs.existsSync(UPLOADS_DIR)) {
//   fs.mkdirSync(UPLOADS_DIR);
//   console.log(`Created uploads folder: ${UPLOADS_DIR}`);
// }

// app.use("/api/featured", featuredRoutes);
// app.use("/api/explore", exploreRoutes);
// app.use("/api/authors", aboutAuthorRoutes);
// app.use('/api/contact', contactRoutes);
// app.use("/api/files", fileRoutes);

// // mongoose
// //   .connect(process.env.MONGODB_URI)
// //   .then(() => {
// //     console.log(" MongoDB Connected");
// //     app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
// //   })
// //   .catch((err) => console.error(" MongoDB Error:", err));


// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });

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
import skillRoutes from "./routes/skillRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB


// --- CORS Setup ---
const allowedOrigins = [
  "http://localhost:5173",               // Local Vite dev
  "https://anam-portfolio-v9sq.vercel.app", // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or Postman
    const normalizedOrigin = origin.replace(/\/$/, ""); // remove trailing slash
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS policy: This origin is not allowed -> ${origin}`));
    }
  },
  credentials: true, // if you use cookies
}));

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Ensure uploads folder exists
const UPLOADS_DIR = "./uploads";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
  console.log(`Created uploads folder: ${UPLOADS_DIR}`);
}

// Optional: normalize trailing slashes in routes
app.use((req, res, next) => {
  if (req.path.substr(-1) === "/" && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

connectDB();

// Routes
app.use("/api/featured", featuredRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/authors", aboutAuthorRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/files", fileRoutes);
// Skills API
app.use("/api/skills", skillRoutes);

// Start server
app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Allowed CORS origins:", allowedOrigins.join(", "));
});
