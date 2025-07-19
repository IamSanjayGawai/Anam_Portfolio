import express from "express";
import {
  getAllFeatured,
  createFeatured,
  updateFeatured,
  deleteFeatured,
} from "../controllers/featuredController.js";

const router = express.Router();

router.get("/", getAllFeatured);
router.post("/", createFeatured);
router.put("/:id", updateFeatured);
router.delete("/:id", deleteFeatured);

export default router;
