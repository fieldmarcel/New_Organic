import { Recipe } from "../models/singleRecipemodel.js";

const createSingleRecipePage = async (req, res) => {
  const {
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
    image,
  } = req.body;
  const userId = req.user ? req.user.userId : null; 

  console.log("User ID:",userId)
  console.log("req.body :",req.body)

  try {
    // Validate required fields
    if (
      !subCategory ||
      !title ||
      !rating ||
      !description ||
      !cookTime ||
      !serving ||
      !ingredients ||
      !nutrition ||
      !cuisine ||
      !mealType ||
      !steps ||
      !image
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const recipe = await Recipe.create({
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
      image,
      userId,
      isPrePopulated: !userId,
    });

    return res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    return res.status(500).json({
      message: "Error creating recipe",
      error: error.message,
    });
  }
};


const getRecipe = async (req, res) => {
  try {
   const {id}= req.params;
   if (!id) {
    return res.status(400).json({ error: "Recipe ID is missing" });
  }
   const recipe = await Recipe.findById(id).populate("userId", "userName"); 
   if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

 return res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });

  }
};

const getAllRecipes= async(req,res)=>{
  try {
   
    const recipes= await Recipe.find({},"title image rating")
    return res.status(200).json(recipes);

  } catch (error) {
    res.status(500).json({error:"Failed to fetch recipes"})
  }
}
const getFixedRecipes= async(req,res)=>{
  try {
    const limit = parseInt(req.query.limit) ||3;
    const recipes= await Recipe.find({},"title image rating").limit(limit);
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

    const recipes = await Recipe.find({subCategory: { $regex: subCategory, $options: "i" } });
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

export { createSingleRecipePage,getmoreIdeasRecipe, getRecipe,getAllRecipes,getFixedRecipes,getExploreRecipes ,searchRecipes,getCategoryRecipes, getCuisineRecipes};
