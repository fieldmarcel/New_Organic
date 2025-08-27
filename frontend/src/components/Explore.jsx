

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookMarked, Bookmark } from "lucide-react";
import toast from "react-hot-toast"; 

const CuisineSection = ({ title, subTitle, cuisine, className }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(0);

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

      console.log("Sending payload: ", { userId, recipeId }); 

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
      toast.success(response.data.message || "Your recipe is bookmarked");

      console.log("Bookmark response:", res.data);
    } catch (error) {
      toast.error(error.response.data.message || "Recipe already bookmarked");

      console.error("Recipe already bookmarkd:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + `/api/v1/recipes/explore`);
        const data = res.data;
        const filteredRecipes = data.filter(recipe => 
          recipe.cuisine && recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
        ).slice(0, 6); // Limit to 6 recipes
        
        setRecipes(filteredRecipes.length > 0 ? filteredRecipes : data.slice(0, 6));
      } catch (error) {
        console.error(`Error fetching ${cuisine} recipes:`, error);
        setError(error.message);
        setRecipes([
          { id: 1, title: `${cuisine} Recipe 1`, image: "/abc.jpg", time: "25 min", difficulty: "Easy", tags: ["Popular", "Veg"] },
          { id: 2, title: `${cuisine} Recipe 2`, image: "/apple.jpg", time: "40 min", difficulty: "Medium", tags: ["Trending", "Non-Veg"] },
          { id: 3, title: `${cuisine} Recipe 3`, image: "/emoji.png", time: "15 min", difficulty: "Easy", tags: ["Quick", "Veg"] },
          { id: 4, title: `${cuisine} Recipe 4`, image: "/abc.jpg", time: "50 min", difficulty: "Hard", tags: ["Premium", "Non-Veg"] },
          { id: 5, title: `${cuisine} Recipe 5`, image: "/apple.jpg", time: "30 min", difficulty: "Medium", tags: ["Healthy", "Veg"] },
          { id: 6, title: `${cuisine} Recipe 6`, image: "/emoji.png", time: "35 min", difficulty: "Easy", tags: ["Popular", "Non-Veg"] }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [cuisine]);

  return (
    <div className={cn("w-full rounded-lg shadow-sm overflow-hidden", className)}>
      <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-100 to-green-300 border-2 rounded-3xl border-emerald-500/30 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-black">{title}</h2>
          <p className="text-sm md:text-base text-gray-700 mt-1">{subTitle}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 md:h-56">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {recipes.map((recipe, index) => (
                  <div key={recipe._id || index} className="flex-none w-full sm:w-1/2 md:w-1/3 pl-4 first:pl-0">
                    <Link to={`/recipe/${recipe._id}`} className="group cursor-pointer">
                      <div className="overflow-hidden rounded-xl shadow-md bg-gray-900 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                        <div className="relative h-40 md:h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
                          <img
                            src={recipe.image || recipe.imageUrl || "/abc.jpg"}
                            alt={recipe.title || recipe.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <button
                                      onClick={handlebookmark}
                                      className={`p-2 rounded-full shadow-sm transition-colors duration-200 ${
                                        isBookmarked ? "bg-red-500 text-white" : "bg-white text-red-500"
                                      }`}
                                    >
                                      {isBookmarked ? <BookMarked /> : <Bookmark />}
                                    </button>
                            
                          <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                            <div className="flex gap-2">
                              {(recipe.tags || [recipe.category, recipe.cuisine]).filter(Boolean).map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                            {recipe.title || recipe.name}
                          </h3>
                          <div className="mt-2 flex items-center text-sm text-gray-400">
                            <span className="flex items-center">
                              <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                              {recipe.time || recipe.cookTime || recipe.prepTime || "30 min"}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{recipe.difficulty || recipe.level || "Medium"}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button 
                    key={index}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300 hover:bg-green-500",
                      index === 0 ? "bg-green-500 w-4" : "bg-gray-600"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <Link to={`/cuisine/${cuisine}`} className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-colors duration-300">
                View All {cuisine}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CuisineExplorer = () => {
  return (
    <div className="w-full space-y-8 mt-5 md:space-y-10 p-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Explore Cuisines</h1>
        <p className="text-gray-500 mt-2">Discover delicious recipes from around the world</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <CuisineSection 
          title="Indian Cuisine" 
          subTitle="Discover the rich flavors of India" 
          cuisine="Indian"
          className="md:w-lvw" 
        />
      </div>
    </div>
  );
};

export default CuisineExplorer;






 