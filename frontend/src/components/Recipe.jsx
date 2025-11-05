import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

import { 
  Clock, Users, Star, ChefHat, Check, Download, Share2, 
  Bookmark, BookMarked, MoreVertical, User, Heart, Flame, Droplets, Wheat, Timer, Utensils
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlebookmark = async (e) => {
    e.preventDefault();
    try {
      const dataString = localStorage.getItem("data");
      if (!dataString) {
        console.error("No data found in localStorage. User might not be logged in.");
        return;
      }

      const data = JSON.parse(dataString);
      const userId = data.id;

      if (!userId) {
        console.error("userId not found in the data object.");
        return;
      }

      const accessToken = localStorage.getItem("token");
      const recipeId = id;

      console.log("Sending payload:", { userId, recipeId }); 

      if (!accessToken) {
        console.error("No access token found. User might not be logged in.");
      }

      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/users/bookmarks",
        { userId, recipeId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsBookmarked(true);
      console.log("Bookmark response:", res.data);
      toast.success(res.data.message || "Your recipe is bookmarked");

    } catch (error) {
      console.error("Recipe already Bookmarked:", error);
      toast.error(error.response?.data?.message || "Recipe already bookmarked");
      
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URL + `/api/v1/recipes/${id}`);
        setRecipe(data);
      } catch (err) {
        setError("Error fetching recipe details");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleStep = (index) => {
    setCheckedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading recipe...</p>
      </div>
    </div>
  );
  
  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <ChefHat className="w-20 h-20 text-slate-300 mx-auto mb-4" />
        <p className="text-xl text-slate-600">Recipe not found</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    </div>
  );

  const userName = recipe.userId ? recipe.userId.userName : "admin";

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Compact Header with Image and Title Side by Side */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Compact Image */}
            <div className="md:w-2/5 relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={handlebookmark}
                  className={`p-2.5 rounded-xl shadow-lg transition-all duration-300 ${
                    isBookmarked 
                      ? "bg-emerald-600 text-white" 
                      : "bg-white/95 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                  }`}
                >
                  {isBookmarked ? <BookMarked size={20} /> : <Bookmark size={20} />}
                </button>
              </div>
            </div>

            {/* Title and Meta Info */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                    {recipe.title}
                  </h1>
                  <Link to={`/profile/${userName}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
                    <User size={18} />
                    <span className="font-medium">{userName}</span>
                  </Link>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none">
                    <MoreVertical size={20} className="text-slate-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white border border-slate-200 shadow-xl rounded-xl p-1">
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-50 transition-colors p-2.5">
                      <Link to={`/profile/${userName}`} className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-700">View Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-50 transition-colors p-2.5">
                      <Heart className="mr-2 h-4 w-4 text-rose-500" />
                      <span className="text-sm font-medium text-slate-700">Follow Chef</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-50 transition-colors p-2.5">
                      <Share2 className="mr-2 h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Share Recipe</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-50 transition-colors p-2.5">
                      <Download className="mr-2 h-4 w-4 text-violet-600" />
                      <span className="text-sm font-medium text-slate-700">Download</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Inline Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Cook Time</p>
                    <p className="text-lg font-bold text-slate-800">{recipe.cookTime} min</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Servings</p>
                    <p className="text-lg font-bold text-slate-800">{recipe.serving}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Rating</p>
                    <p className="text-lg font-bold text-slate-800">{recipe.rating} ⭐</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Cuisine</p>
                    <p className="text-base font-bold text-slate-800">{recipe.cuisine}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
            About This Recipe
          </h2>
          <p className="text-slate-600 leading-relaxed">{recipe.description}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Ingredients - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => toggleIngredient(index)}
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                        checkedIngredients.includes(index)
                          ? "bg-emerald-600 border-emerald-600"
                          : "border-slate-300"
                      }`}
                    >
                      {checkedIngredients.includes(index) && (
                        <Checkbox 
  checked={checkedIngredients.includes(index)}
  onCheckedChange={() => toggleIngredient(index)}
  className="w-5 h-5"
/>
                      )}
                    </div>
                    <span
                      className={`text-sm transition-all ${
                        checkedIngredients.includes(index) 
                          ? "line-through text-slate-400" 
                          : "text-slate-700"
                      }`}
                    >
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-emerald-600" />
                Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => toggleStep(index)}
                  >
                    <div
                      className={`w-7 h-7 border-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        checkedSteps.includes(index)
                          ? "bg-emerald-600 border-emerald-600"
                          : "border-slate-300"
                      }`}
                    >
                      {checkedSteps.includes(index) ? (
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      ) : (
                        <span className="text-sm font-bold text-slate-600">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm leading-relaxed transition-all ${
                        checkedSteps.includes(index) 
                          ? "line-through text-slate-400" 
                          : "text-slate-700"
                      }`}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Nutrition Facts - Horizontal Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-600" />
            Nutrition Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{recipe.nutrition.calories}</p>
                <p className="text-xs text-slate-600 font-medium">Calories</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Droplets className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{recipe.nutrition.protein}g</p>
                <p className="text-xs text-slate-600 font-medium">Protein</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Wheat className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{recipe.nutrition.carbs}g</p>
                <p className="text-xs text-slate-600 font-medium">Carbs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{recipe.nutrition.fat}g</p>
                <p className="text-xs text-slate-600 font-medium">Fat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className=" ">
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Recipe;