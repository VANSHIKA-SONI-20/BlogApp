import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js"; // ✅

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", protect, upload.single("image"), createPost); // ✅
router.put("/:id", protect, upload.single("image"), updatePost); // ✅
router.delete("/:id", protect, deletePost);

export default router;
