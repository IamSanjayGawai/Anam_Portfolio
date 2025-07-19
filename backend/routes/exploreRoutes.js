import express from "express";
import {
  getAllExplore,
  createExplore,
  updateExplore,
  deleteExplore,
} from "../controllers/exploreController.js";
import { upload } from "../multer.js"; // <-- the multer config above

const router = express.Router();

router.get("/get", getAllExplore);
router.post("/create", upload.single("image"), createExplore);
router.put("/update/:id", upload.single("image"), updateExplore);
router.delete("/delete/:id", deleteExplore);

export default router;
