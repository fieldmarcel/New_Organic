import { Recipe } from "../models/singleRecipemodel.js";
import { Rating } from "../models/ratingModel.js";
import redisClient from "../utils/redisClient.js";


// controllers/ratingController.js
import mongoose from "mongoose";

export const rateRecipe = async (req, res) => {
  try {
    const { recipeId, value } = req.body;
const userId = req.user.userId;
    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be 1–5" });
    }

    // Find if this user already rated
    const existingRating = await Rating.findOne({ recipeId, userId });

    if (existingRating) {
      existingRating.value = value;
      await existingRating.save();
    } else {
      await Rating.create({ recipeId, userId, value });
    }

    // Recalculate avg rating using aggregation pipeline
    const result = await Rating.aggregate([
  { $match: { recipeId: new mongoose.Types.ObjectId(recipeId) } },
  { $group: { _id: "$recipeId", averageRating: { $avg: "$value" }, count: { $sum: 1 } } }
]);


    const averageRating = result[0].averageRating.toFixed(1);//4.33333 to 4.3 by fixed 1
    const ratingCount = result[0].count;
    // Invalidate cache for this recipe

await redisClient.del(`/recipes/${recipeId}`);

await redisClient.del(`/recipes/fixed`);
    await redisClient.del(`/recipes/explore`);
    await redisClient.del(`/recipes/moreideas`);
    
    await Recipe.findByIdAndUpdate(recipeId, {
      averageRating: averageRating,
      ratingCount: ratingCount
    });

    return res.status(200).json({
      success: true,
      message: "Rating submitted successfully",
      averageRating: averageRating,
      ratingCount
    });

  } catch (error) {
    console.error("Rating Error:", error);
    res.status(500).json({ message: "Error saving rating", error: error.message });
  }
};
