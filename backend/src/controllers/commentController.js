import { Comment } from "../models/commentModel.js";

const createComment = async (req, res) => {
    const { id } = req.params; // Recipe ID from URL params
    const { comment, userId } = req.body; // Accept userId
  
    try {
      if (!id) {
        return res.status(400).json({ error: "Recipe ID is required" });
      }
      if (!comment) {
        return res.status(400).json({ error: "Comment text is required" });
      }
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      // Create the comment
      const newComment = await Comment.create({
        recipeId: id,
        comment,
        userId,
      });
  
      // Populate the userId field before returning the response
      const populatedComment = await Comment.findById(newComment._id).populate({
        path: "userId",
        select: "userName", // Only include the userName field
      });
  
      res.status(201).json(populatedComment);
    } catch (error) {
      console.error("Error creating comment:", error.message);
      return res.status(500).json({
        message: "Error creating comment",
        error: error.message,
      });
    }
  };
  

// Get all comments for a specific recipe
const getCommentsByRecipe = async (req, res) => {
    const { id } = req.params; // Recipe ID from URL params
  
    try {
      if (!id) {
        return res.status(400).json({ error: "Recipe ID is required" });
      }
  
      // Fetch comments and populate the userId field to get userName
      const comments = await Comment.find({ recipeId: id }).populate({
        path: "userId",
        select: "userName", // Only include the userName field from the User document
      });
  
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      return res.status(500).json({
        message: "Error fetching comments",
        error: error.message,
      });
    }
  };

  const deleteComment = async (req, res) => {
    const { commentId } = req.params;
  
    try {
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      // Delete the comment
      await Comment.deleteOne({ _id: commentId }); // Use deleteOne or findByIdAndDelete
      res.status(204).end(); // No content to send back
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      return res.status(500).json({
        message: "Error deleting comment",
        error: error.message,
      });
    }
  };

export { createComment, getCommentsByRecipe ,deleteComment};
