import { Recipe } from "../models/singleRecipemodel.js";
import { Rating } from "../models/ratingModel.js";
import redisClient from "../utils/redisClient.js";

const createSingleRecipePage = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : null;
    const imageUrl = req.file?.path; // Cloudinary uploaded URL ✅

    console.log("Uploaded Image URL:", imageUrl);
    console.log("User ID:", userId);
    console.log("req.body:", req.body);

    let {
      subCategory,
      title,
      rating,
      description,
      cookTime,
      readyIn,
      serving,
      ingredients,
      nutrition,
      cuisine,
      mealType,
      steps,
    } = req.body;

    // ✅ Convert data formats (important!)
    if (typeof ingredients === "string") {
      ingredients = ingredients.split(",").map((i) => i.trim());
    }
if (typeof steps === "string") {
steps = steps.split(",").map((s) => s.trim());
}
    if (typeof steps === "string") {
      steps = steps.split("\n").map((s) => s.trim());
    }

    if (typeof nutrition === "string") {
      nutrition = JSON.parse(nutrition);
    }

    // ✅ Validate required fields
    if (
      !subCategory ||
      !title ||
      !description ||
      !cookTime ||
      !serving ||
      !ingredients?.length ||
      !nutrition ||
      !cuisine ||
      !mealType ||
      !steps?.length ||
      !imageUrl
    ) {
      return res.status(400).json({ error: "All fields including image are required." });
    }

    const recipe = await Recipe.create({
      subCategory,
      title,
      description,
      cookTime,
      readyIn,
      serving,
      ingredients,
      nutrition,
      cuisine,
      mealType,
      steps,
      image: imageUrl, // ✅ Store uploaded Cloudinary URL
      userId,
      isPrePopulated: !userId,
    });
      // Invalidate cache (important!) after recipe creation
  
await redisClient.del("/recipes");     // all recipes
await redisClient.del("/recipes/fixed");
await redisClient.del("/recipes/explore");
await redisClient.del("/recipes/moreideas");
await redisClient.del("/recipes/search");  // wildcard delete recommended
await redisClient.del(`/recipes/category/${subCategory}`);
await redisClient.del(`/recipes/cuisine/${cuisine}`);

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully ✅",
      recipe,
    });

  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating recipe",
      error: error.message,
    });
  }
};
const deleteSingleRcipe= async(req,res)=>{
  try {
    const userId= req.user ?req.user.userId :null;
    const {id}= req.params;
    if(!id){
      return res.status(400).json({error:"Recipe ID is missing"});
    }
const recipe= await Recipe.findById(id);
if(!recipe) {
  console.error("Recipe not found for deletion:", id);
  return res.status(404).json({ error: "Recipe not found" });
}

if(recipe.userId.toString() !== userId){
  return res.status(403).json({error:"You are not authorized to delete this recipe"});
}

await Recipe.findByIdAndDelete(id);
await redisClient.del(`/recipes/${id}`);
await redisClient.del("/recipes");
await redisClient.del("/recipes/fixed");
await redisClient.del("/recipes/explore");
await redisClient.del("/recipes/moreideas");
await redisClient.del(`/recipes/category/${recipe.subCategory}`);
await redisClient.del(`/recipes/cuisine/${recipe.cuisine}`);

return res.status(200).json({success:true, message:"Recipe deleted successfully"});

  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}
const getRecipe = async (req, res) => {
  try {
   const {id}= req.params;

const userId= req.user ? req.user.userId :null;

   if (!id) {
    return res.status(400).json({ error: "Recipe ID is missing" });
  }
   const recipe = await Recipe.findById(id).populate("userId", "userName"); 
   if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  let userRating=0;
if(userId){
  const existingRating = await Rating.findOne({recipeId:id,userId})
  if(existingRating){
    userRating= existingRating.value
  }
}

 return res.status(200).json({recipe ,success:true, averageRating: recipe.averageRating ||0, ratingCount:recipe.ratingCount ||0, userRating});


  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });

  }
};

const getAllRecipes= async(req,res)=>{
  try {
   
    const recipes= await Recipe.find({},"title image averageRating ratingCount")
    return res.status(200).json(recipes);

  } catch (error) {
    res.status(500).json({error:"Failed to fetch recipes"})
  }
}
const getFixedRecipes= async(req,res)=>{
  try {
    const limit = parseInt(req.query.limit) ||3;
    const recipes= await Recipe.find({},"title image  averageRating ratingCount" ).limit(limit);
    return res.status(200).json(recipes);

  } catch (error) {
    res.status(500).json({error:"Failed to fetch recipes"})
  }
}

const getExploreRecipes = async(req,res)=>{
  try {
    const recipeIds= ["679cd6d21577cfd23fe747f5","67b65ef158b1a27cc74cce47","67b68e67e89c1a18b0fc4481","67bdac3f9cca3c3bbb6d8d1c","67bdadce9cca3c3bbb6d8d3a","67b66c6839eb1e052b4fd467"]
    // $in operator is used to find documents where 
    // the _id field matches any value in the recipeIds array.   
      const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getmoreIdeasRecipe = async(req,res)=>{
  try {
    const recipeIds= ["67bfebadc0599fc44cbb075f","67bfede6c0599fc44cbb0793","67bfec99c0599fc44cbb078d","67bdac3f9cca3c3bbb6d8d1c","67bfe979c0599fc44cbb072e","67bfef0dc0599fc44cbb07d0"]
    // $in operator is used to find documents where 
    // the _id field matches any value in the recipeIds array.   
      const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getCategoryRecipes= async(req,res)=>{
  try {
    const subCategory= req.params.subCategory;
    if (!subCategory) {
      return res.status(400).json({ error: "Category parameter is missing" });
    }

    const recipes = await Recipe.find({subCategory: { $regex: subCategory, $options: "i" } }," title image averageRating ratingCount");
        console.log("Category Recipes:",recipes);
    return res.status(200).json(recipes);

  } catch (error) {
    res.status(500).json({error:"Failed to fetch  subcategory recipes"})
  }
}
const getCuisineRecipes= async (req, res)=>{
  try {
    const cuisine= req.params.cuisine;
  if (!cuisine) {
    return res.status(400).json({ error: "Cuisine parameter is missing" });
  }
  const recipes = await Recipe.find({cuisine: { $regex: cuisine, $options: "i" } });
  console.log("Cuisine Recipes:",recipes);
    return res.status(200).json(recipes);
  
  } catch (error) {
    res.status(500).json({error:"Failed to fetch  cuisine recipes"})
  }
  
}
// Search recipes
// The $or operator is used to search either the title or ingredients
//  fields. The $regex with $options: 'i' makes the search
//  case-insensitive. If there's an error, it sends a 500 status
//  with an error message.
const searchRecipes = async (req, res) => {
  try {
const query = String(req.query.query || "").trim();
    if (!query?.trim()) {
      return res.status(400).json({ error: "Query is required" });
    }
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subCategory: { $regex: query, $options: "i" } },
        {cuisine: { $regex:query, $options:"i"}},
        {mealType: { $regex:query, $options:"i"}},


      ],
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Search Error:", error); 

    res.status(500).json({ error: "Search is failed  " });
  }
};
const updateSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;

    if (!id) return res.status(400).json({ error: "Recipe ID is missing" });

    // 1. Find existing recipe to check ownership
    const existingRecipe = await Recipe.findById(id);
    if (!existingRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // 2. Authorization Check
    if (existingRecipe.userId.toString() !== userId) {
      return res.status(403).json({ error: "You are not authorized to edit this recipe" });
    }

    // 3. Prepare Update Data
    let updates = { ...req.body };

    // Handle Image: Only update if a new file is uploaded via Cloudinary/Multer
    if (req.file && req.file.path) {
      updates.image = req.file.path;
    }

    // Handle Data Formatting (FormData sends arrays/objects as strings)
    if (typeof updates.ingredients === "string") {
      updates.ingredients = updates.ingredients.split(",").map((i) => i.trim());
    }
    if (typeof updates.steps === "string") {
      // Split by newline or custom delimiter depending on how you send it
      updates.steps = updates.steps.includes("\n") 
        ? updates.steps.split("\n").map((s) => s.trim()) 
        : updates.steps.split(",").map((s) => s.trim());
    }
    if (typeof updates.nutrition === "string") {
      try {
        updates.nutrition = JSON.parse(updates.nutrition);
      } catch (e) {
        console.error("Error parsing nutrition JSON", e);
      }
    }

    // 4. Update Database
    // { new: true } returns the updated document
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, {
      new: true, 
      runValidators: true,
    });
await redisClient.del(`/recipes/${id}`);
await redisClient.del("/recipes");
await redisClient.del("/recipes/fixed");
await redisClient.del("/recipes/explore");
await redisClient.del("/recipes/moreideas");
await redisClient.del(`/recipes/category/${existingRecipe.subCategory}`);
await redisClient.del(`/recipes/cuisine/${existingRecipe.cuisine}`);
    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully ✅",
      recipe: updatedRecipe,
    });

  } catch (error) {
    console.error("Error updating recipe:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating recipe",
      error: error.message,
    });
  }
};



export { createSingleRecipePage, deleteSingleRcipe,  getmoreIdeasRecipe, getRecipe,getAllRecipes,getFixedRecipes,getExploreRecipes ,searchRecipes,getCategoryRecipes, getCuisineRecipes,updateSingleRecipe};
