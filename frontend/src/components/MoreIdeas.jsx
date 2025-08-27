import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; 

const MoreIdeas = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(

          import.meta.env.VITE_BASE_URL + "/api/v1/recipes/moreideas"
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full p-4 md:p-8 rounded-3xl animate-pulse">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 md:p-8 bg-red-50 rounded-3xl shadow-md">
        <div className="flex justify-center items-center h-40">
          <p className="text-red-600">
            Failed to load recipes. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          More Ideas
        </h2>
        <Link
          to={"/search"}
          className="px-3 py-1 md:px-4 md:py-2 bg-green-600 text-white text-sm md:text-base font-medium rounded-full hover:bg-green-700 transition-colors duration-300"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            to={`/recipe/${recipe._id}`}
            className="block hover:scale-105 transition-transform duration-300"
          >
            <Card
              className={cn(
                "overflow-hidden hover:shadow-2xl bg-white transition-shadow duration-300 rounded-3xl border-none",
                ""
              )}
            >
              <div className="relative h-48 overflow-hidden rounded-t-3xl"> 
                <img
                  src={recipe.image || "/default-recipe.jpg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover transform transition-transform duration-500"
                  style={{ filter: "brightness(95%)" }}
                />
              </div>
              <CardContent className="p-3 md:p-4">
                <h3 className="text-base md:text-lg font-medium text-gray-800 line-clamp-1">
                  {recipe.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreIdeas;
