// import express from "express";
// import {
//   getAuthor,
//   createAuthor,
//   updateAuthor,
//   deleteAuthor
// } from "../controllers/aboutAuthorController.js";
// import { upload } from "../multer.js";

// const router = express.Router();

// router.get("/", getAuthor);
// router.post("/create", upload.single("image"), createAuthor);
// router.put("/update", upload.single("image"), updateAuthor);
// router.delete("/delete", deleteAuthor);

// export default router;



import express from "express";
import { createOrUpdateAuthor, getAuthor, deleteAuthor } from "../controllers/aboutAuthorController.js";
import { upload } from "../multer.js";

const router = express.Router();

router.get("/", getAuthor);
router.post("/", upload.single("image"), createOrUpdateAuthor);
router.delete("/", deleteAuthor);

export default router;
