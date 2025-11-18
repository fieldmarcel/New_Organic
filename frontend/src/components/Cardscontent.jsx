import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BorderBeam } from "../components/ui/border-beam";
import { BookMarked, Bookmark, Star } from "lucide-react";
import { toast } from "react-hot-toast";

const Cardscontent = ({ id, image, title, rating }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const handlebookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const dataString = localStorage.getItem("data");

      if (!dataString) {
        toast.error("Please log in to bookmark recipes");
        return;
      }

      const data = JSON.parse(dataString);
      const userId = data.id;

      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      const accessToken = localStorage.getItem("token");
      const recipeId = id;

      if (!accessToken) {
        toast.error("Please log in to bookmark recipes");
        return;
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
      toast.success(res.data.message || "Recipe bookmarked successfully!");

    } catch (error) {
      toast.error(error.response?.data?.message || "Recipe already bookmarked");
      console.error("Bookmark error:", error);
    }
  };

  return (
    <Link
      to={`/recipe/${id}`}
      className="group sm:h-[32rem] sm:w-[20rem] block relative w-full h-96 max-w-xs mx-auto transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
    >
      {/* Animated border beam */}
      <BorderBeam
        size={500}
        duration={6}
        delay={0}
        borderWidth={3.5}
        className="rounded-3xl -inset-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        colorFrom="#F93827"
        colorTo="#F7DCB9"
      />
      
      {/* Main card container */}
      <div className="relative w-full h-full rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 z-10 bg-slate-900">
        
        {/* Image with zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image || "/placeholder-food.jpg"}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Gradient overlay - darkens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />

        {/* Decorative blur accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Bookmark button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handlebookmark}
            className={`group/btn p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isBookmarked 
                ? "bg-red-500 text-white shadow-red-500/50" 
                : "bg-white/90 text-red-500 hover:bg-white"
            }`}
          >
            {isBookmarked ? (
              <BookMarked className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5 group-hover/btn:fill-current transition-all duration-200" />
            )}
          </button>
        </div>

        {/* Rating badge */}
        {rating && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 rounded-full shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300">
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-bold text-white">
              {Number(rating).toFixed(1)}
            </span>
          </div>
        )}

        {/* Content section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 text-white z-20">
          
          {/* Title */}
          <h3 className="text-6xl font-bold line-clamp-2 leading-tight drop-shadow-lg transform group-hover:translate-y-[-4px] transition-transform duration-300">
            {title}
          </h3>

          {/* View Recipe Button - appears on hover */}
          <div className="overflow-hidden">
            <button 
              className="w-full py-3 px-4 bg-white/95 backdrop-blur-sm text-slate-900 rounded-full font-semibold shadow-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-white hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>View Recipe</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardscontent;