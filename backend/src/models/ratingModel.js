// models/ratingModel.js
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    value: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
