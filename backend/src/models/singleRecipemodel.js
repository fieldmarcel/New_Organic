import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    recipeId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    isPrePopulated: {
      type: Boolean,
      default: false,
      index: true,
    },

    subCategory: { type: String, index: true },
    title: { type: String, required: true, index: true },
    
   averageRating: { type: Number, default: 0 },  // dynamically updated
   ratingCount: { type: Number, default: 0 },  

    description: { type: String, index: true },
    cookTime: { type: Number, required: true, index: true },
    readyIn: { type: Number, index: true },
    serving: { type: Number, index: true },
    ingredients: { type: [String], required: true, index: true },
    nutrition: {
      calories: { type: Number, required: true },
      fat: { type: Number, required: true },
      carbs: { type: Number, required: true },
      protein: { type: Number, required: true },
    },
    cuisine: { type: String, index: true },
    mealType: { type: String, index: true },
    steps: { type: [String], index: true },
    image: { type: String, required: true }, // Cloudinary URL or static image URL
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
