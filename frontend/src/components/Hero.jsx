import React, { useEffect, useState } from "react";
import { BiSearch, BiPlay, BiArrowFromRight } from "react-icons/bi";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../components/ui/Animated-tooltip";
import { People } from "./ui/acertinity";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
const Hero = () => {
const {id}= useParams();
  const [userName, setUserName] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeId=  id  || "67bff003c0599fc44cbb07fa";
        const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/v1/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);



  useEffect(() => {
    // Retrieving userName from localStorage 
    const storedUserName = localStorage.getItem("userName")?.replace(/"/g, "") ?? "Guest";
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="flex flex-col items-center relative h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-2/3 h-3/5 rounded-bl-[200px] rounded-tr-[200px] rounded-br-[50px] bg-gradient-to-br from-green-50 to-green-600 -z-10"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute -top-10 -left-20 w-64 h-64 rounded-full bg-yellow-50 -z-10 opacity-60"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-green-50 -z-10 opacity-60"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-40 left-1/4 w-8 h-8 rounded-full bg-green-200 -z-10 opacity-60"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-10 w-6 h-6 rounded-full bg-yellow-200 -z-10 opacity-60"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="flex flex-col w-full max-w-7xl mx-auto py-12 px-4 md:px-6 lg:px-8 h-3/4">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 h-full">
          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
             {userName && (
              <motion.p
                className="text-3xl md:text-4xl font-bold text-green-500 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Welcome, <span className="text-orange-500">{userName}</span> in
              </motion.p>
            )}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Adventure <br /> of{" "}
              <span className="text-green-500 relative inline-block">
                Delicacies
                <motion.div
                  className="absolute -bottom-2 left-0 h-2 bg-green-200 w-full z-[-1]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Explore a universe of culinary recipes, passionately created to
              tantalize your taste buds on an incredible journey of flavors.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.button
                className="px-6 py-3 bg-green-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/search"} className="flex items-center gap-2">
                  <BiSearch className="text-lg" />
                  Explore Recipes
                </Link>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 flex justify-center items-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative w-full max-w-md"
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 1, 0, -1, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
                rotateZ: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <div className="absolute -inset-4 rounded-full bg-white/30 backdrop-blur-md -z-10"></div>
              <img
                src="/Group 22.png"
                alt="Delicious food illustration"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
              <motion.div
                className="absolute -bottom-4 w-full h-6 bg-black/10 blur-xl rounded-full"
                animate={{
                  width: ["90%", "95%", "90%"],
                  x: ["5%", "2.5%", "5%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className=" sm:block hidden w-full max-w-7xl mx-auto -mt-16 bg-white rounded-3xl p-6 lg:p-8 shadow-xl z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 lg:w-1/4 relative">
            <motion.div
              className="w-full rounded-2xl overflow-hidden relative shadow-xl"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={recipe.image}
                alt="Featured recipe"
                className="w-full h-full object-cover"
                controls
              />

              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              
            </motion.div>

          </div>

          <div className=" sm:block hidden md:w-2/3 lg:w-3/4">
            <motion.div
              className="inline-block px-3 py-1 rounded-full bg-green-100 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <p className="text-sm font-semibold tracking-wider text-green-600">FEATURED</p>
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl font-margarine text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
{             recipe.title
}            </motion.h2>

            <motion.p
              className="text-gray-600 mb-6 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
 {recipe.description
    ? recipe.description.split(" ").slice(0, 28).join(" ") + (recipe.description.split(" ").length > 28 ? "..." : "")
    : "No description available."}  </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Link
                to={`/recipe/${recipe._id}`}
                className="group px-5 py-2 border-2 border-green-500 text-green-600 rounded-full font-medium inline-flex items-center gap-2 hover:bg-green-500 hover:text-white transition-all"
              >
                See Recipe
                <BiArrowFromRight className="text-lg transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-7xl mx-auto mt-12 px-4 md:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >

      </motion.div>
    </div>
  );
};

export default Hero;
