
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Searchcontent from "../components/Searchcontent";
import { motion } from "framer-motion";

const SubCategory = () => {
  const [subcategoryRecipes, setSubcategoryRecipes] = useState([]);
  const {subCategory} = useParams();

  const fetchSubcategoryRecipes = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + `/api/v1/recipes/subCategory/${subCategory}`);

      setSubcategoryRecipes(res.data);
      console.log("Subcategory Recipes:", res.data);
    } catch (error) {
      console.error("Failed to fetch subcategory recipes:", error.message);
    }
  };
  useEffect(() => {
    console.log("Fetching recipes for:", subCategory);
    if (subCategory) {
      fetchSubcategoryRecipes();
    } else {
      console.error("subCategory parameter is undefined");
    }
  }, [subCategory])
   

  return (
    <div className="min-h-screen p-6">
      {/* Page Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800"
      >
        {subCategory} recipes
      </motion.h2>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subcategoryRecipes.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 col-span-full"
          >
            No recipes found
          </motion.p>
        ) : (
          subcategoryRecipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Searchcontent
                key={recipe._id}
                id={recipe._id}
                title={recipe.title}
                image={recipe.image}
                rating={recipe.rating}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubCategory;
