import { Bookmark } from "../models/favouritemodel.js";
import { Recipe } from "../models/singleRecipemodel.js";
import { User } from "../models/usermodel.js";


const bookmarkRecipe = async (req, res) => {
    try {
      const { userId, recipeId } = req.body; 
  
      const user = await User.findById(userId); 
      const recipe = await Recipe.findById(recipeId);
  
      console.log("Found user:", user);
      console.log("Found recipe:", recipe);
  
      if (!user || !recipe) {
        return res.status(404).json({ message: "User or Recipe not found" });
      }
  
      const existingBookmark = await Bookmark.findOne({ user: userId, recipe: recipeId });
      if (existingBookmark) {
        return res.status(400).json({ message: "Recipe already bookmarked" });
      }
  
      const bookmark = new Bookmark({ user: userId, recipe: recipeId });
      await bookmark.save();
      return res.status(201).json({ message: "Recipe bookmarked successfully", bookmark });
    } catch (error) {
      res.status(500).json({ message: "Error bookmarking recipe", error: error.message });
    }
  };




  const unBookMarkRecipe = async (req, res) => {
    try {
      const { userId, recipeId } = req.body; 
  
      const deleteBookmark = await Bookmark.findOneAndDelete({ user: userId, recipe: recipeId });
  
      if (!deleteBookmark) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
  
      res.status(200).json({ message: "Recipe unbookmarked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error unbookmarking recipe", error: error.message });
    }
  };


  const getBookmarkedRecipes = async (req, res) => {
    try {
      const userName = req.params.userName;
  
      // Find the user by userName
      const user = await User.findOne({ userName });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find all bookmarks for the user and populate the recipe details
      const bookmarks = await Bookmark.find({ user: user._id }).populate("recipe");
  
      if (!bookmarks || bookmarks.length === 0) {
        return res.status(404).json({ message: "No bookmarked recipes found" });
      }
  
      // Extract the recipes from the bookmarks
      const bookmarkedRecipes = bookmarks.map((bookmark) => bookmark.recipe);
  
      res.status(200).json({ bookmarkedRecipes });
    } catch (error) {
      console.error("Error fetching bookmarked recipes:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
export {bookmarkRecipe,unBookMarkRecipe,getBookmarkedRecipes};