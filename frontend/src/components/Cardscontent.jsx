
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BorderBeam } from "../components/ui/border-beam";
import { BookMarked, Bookmark } from "lucide-react";
import { toast } from "react-hot-toast";

const Cardscontent = ({ id, image, title, rating }) => {
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
      toast.success(response.data.message || "Your recipe is bookmarked");

      console.log("Bookmark response:", res.data);
    } catch (error) {
      toast.error(error.response.data.message || "Recipe already bookmarkd");

      console.error("Recipe already bookmarkd:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };
  return (
    <Link
      to={`/recipe/${id}`}
      className="sm:h-[32rem] sm:w-[20rem] block relative w-full h-96 max-w-xs mx-auto transition-transform duration-300 hover:-translate-y-2"
    >
      <BorderBeam
        size={500}
        duration={6}
        delay={0}
        borderWidth={3.5}
        className="rounded-3xl -inset-[2px]"
        colorFrom="#F93827"
        colorTo="#F7DCB9"
      />
      <div className="relative w-full h-full rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 z-10">
        <img
          src={image || "/placeholder-food.jpg"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />


        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handlebookmark}
            className={`p-2 rounded-full shadow-sm transition-colors duration-200 ${
              isBookmarked ? "bg-red-500 text-white" : "bg-white text-red-500"
            }`}
          >
            {isBookmarked ? <BookMarked /> : <Bookmark />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 text-white">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold line-clamp-2 leading-tight">
              {title}
            </h3>
            <span className="flex items-center bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur">
              ⭐ {rating}
            </span>
          </div>

          <div className="">
            <button className="opacity-0 hover:opacity-100 transition-opacity-colors duration-300 w-full py-2 bg-white/90 text-gray-900 rounded-3xl font-semibold hover:bg-white">
              View Recipe
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardscontent;
