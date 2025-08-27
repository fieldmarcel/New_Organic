import express from "express";
import { createComment, getCommentsByRecipe,deleteComment } from "../controllers/commentController.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Route to create a comment (POST)
router.post("/:id",createComment);

// Route to get comments by recipe ID (GET)
router.get("/:id", getCommentsByRecipe);
router.delete("/:commentId",deleteComment);

export default router;
