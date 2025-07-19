import express from "express";
import { uploadResume } from "../multerResume.js";
import {
  uploadResumeController,
  downloadResumeController,
} from "../controllers/fileController.js";

const router = express.Router();


router.post("/upload-resume", uploadResume.single("resume"), uploadResumeController);
router.get("/download-resume", downloadResumeController);

export default router;
