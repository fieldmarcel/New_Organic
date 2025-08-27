


import React, { useState,useEffect } from "react";
import Cardscontent from "./Cardscontent";
import { fetchRecipeCards } from "../../redux/slices/allCardSlice";
import { useDispatch, useSelector } from "react-redux";
// import { BorderBeam } from "../components/ui/border-beam";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "../components/ui/carousel";


const Cards = () => {

  const [recipe, setrecipe] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const featuredrecipes= async()=>{
  setLoading(true)
  try {
    const recipes= await axios.get(import.meta.env.VITE_BASE_URL + `/api/v1/recipes/fixed?limit=3`)
    console.log("API Response:", recipes.data);
    setrecipe(recipes.data);
     return recipes.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    setError(error.response?.data?.message || "Failed to fetch recipes");
  }finally{
    setLoading(false)
  }
}

useEffect(() => {
  const abortController = new AbortController();
    
  featuredrecipes();

  return () => abortController.abort(); // Cleanup function
}, []);
if (loading) return <p className="text-center">Loading recipes...</p>;
if (error) return <p className="text-center text-red-500">{error}</p>;



  // const dispatch = useDispatch();
  // const { isLoading, recipe, error } = useSelector((state) => state.RecipeCard);

  // useEffect(() => {
  //   dispatch(fetchRecipeCards());
  // }, [dispatch]);

  // if (isLoading) return <p className="text-center">Loading recipes...</p>;
  // if (error) return <p className="text-center text-red-500">Error fetching recipes. Please try again later.</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center sm:mt-10 sm:mb-6">
        Featured Recipes
      </h1>

      {/* Desktop   */}
      <div className="hidden sm:flex flex-wrap justify-center items-center sm:mt-10 space-x-4">

        {recipe.length > 0 ? (
          recipe.map((item) => (
            <Cardscontent
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              rating={item.rating}
            />
          ))
        ) : (
          <p className="text-red-500">Error in loading recipes</p>
        )}

      </div>
{/* //max-w-xs */}
      {/* Mobile */}
      <div className="sm:hidden w-[22rem]  sm:mt-6 mb-6 relative">
        <Carousel>
          <CarouselContent>
          
            {recipe.length > 0 ? (
              recipe.map((item) => (
                <CarouselItem key={item._id}>
                  <div className="p-2 flex justify-center">
                    <Card className="">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <Cardscontent
                          id={item._id}
                          image={item.image}
                          title={item.title}
                          rating={item.rating}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <p className="text-center text-red-500">Error in loading recipes</p>
            )}
          </CarouselContent>
          <div className="flex justify-end gap-4  mr-4 px-4">
      <CarouselPrevious className="relative left-0 translate-x-0 -top-0 sm:hidden" />
      <CarouselNext className="relative right-0 translate-x-0 -top-0 sm:hidden" />
    </div>
        </Carousel>
       
      </div>
    </div>
  );
};

export default Cards;
