
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  Clock, Users, Star, ChefHat, Check, Download, Share2, 
  Bookmark,BookMarked, MoreVertical, User, Heart
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
        console.error(
          "No data found in localStorage. User might not be logged in."
        );
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
      toast.success(response.data.message || "Your recipe is bookmarked");

    } catch (error) {
      console.error("Recipe already Bookmarkd :", error);
     toast.error(error.response.data.message || "Recipe already bookmarkd");
      
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

  if (loading) return <div className="text-center mt-10 animate-pulse">Loading...</div>;
  if (!recipe) return <div className="text-center mt-10">Recipe not found</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const userName = recipe.userId ? recipe.userId.userName : "admin";
  const userId = localStorage.getItem("userName")?.replace(/"/g, ""); 
  return (
    <div className="max-w-6xl mx-auto p-2 md:p-4 bg-white/90">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Left column with image and quick actions */}
        <div className="md:w-1/3">
          <Card className="overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-2">
                <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                  <Download size={18} /> Download
                </button>
                <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                  <Share2 size={18} /> Share
                </button>
               <button
                           onClick={handlebookmark}
                           className={`p-2 rounded-full shadow-sm transition-colors duration-200 ${
                             isBookmarked ? "bg-red-500 text-white" : "bg-white text-red-500"
                           }`}
                         >
                           {isBookmarked ? <BookMarked /> : <Bookmark />}
                         </button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical size={18} className="text-gray-500 hover:text-gray-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to={`/profile/${userName}`}><User className="mr-2 h-4 w-4" /> View Profile</Link>
                     
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" /> Follow
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column with title and quick info */}
        <div className="md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{recipe.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-gray-500" />
            <span className="text-lg text-gray-600">Submitted by <Link to={`/profile/${userName}`} className="text-xl font-semibold text-orange-400">{userName}</Link></span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Card className="bg-blue-50 hover:bg-blue-100 transition-colors">
              <CardContent className="p-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                <span>{recipe.cookTime} min</span>
              </CardContent>
            </Card>
            <Card className="bg-green-50 hover:bg-green-100 transition-colors">
              <CardContent className="p-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-500" />
                <span>{recipe.serving} servings</span>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 hover:bg-yellow-100 transition-colors">
              <CardContent className="p-2 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>{recipe.rating} ⭐</span>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 hover:bg-purple-100 transition-colors">
              <CardContent className="p-2 flex items-center">
                <ChefHat className="w-4 h-4 mr-2 text-purple-500" />
                <span>{recipe.cuisine}</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3 flex items-center"></h2>
            <span className="w-1 h-6 font-sans font-bold text-3xl rounded mr-2"> Description</span>
          <p className="text-gray-700">{recipe.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 mb-4">

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-1 h-6 bg-blue-500 rounded mr-2"></span>
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <ol
                  key={index}
                  className="flex items-center cursor-pointer animate-fadeIn"
                  onClick={() => toggleIngredient(index)}
                >
                  <div
                    className={`w-4 h-4 border-2 rounded mr-2 flex items-center justify-center transition-colors ${
                      checkedIngredients.includes(index)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {checkedIngredients.includes(index) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`${
                      checkedIngredients.includes(index) ? "line-through text-gray-400" : "text-gray-700"
                    } transition-all`}
                  >
                    {ingredient}
                  </span>
                </ol>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-1 h-6 bg-green-500 rounded mr-2"></span>
              Instructions
            </h2>
            <ol className="space-y-2">
              {recipe.steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start cursor-pointer animate-fadeIn"
                  onClick={() => toggleStep(index)}
                >
                  <div
                    className={`w-4 h-4 border-2 rounded mr-2 flex items-center justify-center mt-1 transition-colors ${
                      checkedSteps.includes(index)
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {checkedSteps.includes(index) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`${
                      checkedSteps.includes(index) ? "line-through text-gray-400" : "text-gray-700"
                    } transition-all`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <span className="w-1 h-6 bg-purple-500 rounded mr-2"></span>
            Nutrition Facts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="p-2 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-lg font-bold">{recipe.nutrition.calories}</p>
              <p className="text-xs text-gray-500">kcal</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-center hover:bg-green-150 transition-colors">
              <p className="text-sm text-gray-500">Protein</p>
              <p className="text-lg font-bold">{recipe.nutrition.protein}</p>
              <p className="text-xs text-gray-500">g</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="text-lg font-bold">{recipe.nutrition.carbs}</p>
              <p className="text-xs text-gray-500">g</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-center hover:bg-green-150 transition-colors">
              <p className="text-sm text-gray-500">Fat</p>
              <p className="text-lg font-bold">{recipe.nutrition.fat}</p>
              <p className="text-xs text-gray-500">g</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Comments />
    </div>
  );
};

export default Recipe;