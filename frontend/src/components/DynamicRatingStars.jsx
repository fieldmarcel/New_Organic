// components/DynamicRatingStars.jsx

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Rating } from "@/components/ui/rating";
import { Star } from "lucide-react";
import axios from "axios";

const useAuth = () => {
  const [auth, setAuth] = useState({ user: null, token: null });

  useEffect(() => {
    const dataString = localStorage.getItem("data");
    const token = localStorage.getItem("token");

    if (dataString && token) {
      try {
        const data = JSON.parse(dataString);
        if (data.id) setAuth({ user: { id: data.id }, token });
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  return auth;
};
const rateRecipeApi = async (recipeId, ratingValue, token) => {
  const url = import.meta.env.VITE_BASE_URL + "/api/v1/rating/rate";
  const payload = { recipeId, value: ratingValue };  

  const res = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};


const DynamicRatingStars = ({
  recipeId,
  currentAvgRating,
  ratingCount,
  onRatingUpdate,
  initialUserRating = 0,
}) => {
  const { user, token } = useAuth();
  const [userVote, setUserVote] = useState(initialUserRating);
  const [loading, setLoading] = useState(false);
  const [hoverValue, setHoverValue] = useState(0);

  // Sync updated initialUserRating from DB
  useEffect(() => {
    setUserVote(initialUserRating);
  }, [initialUserRating]);

  const handleRate = async (value) => {
    if (!user || !token) return toast.error("Please log in to rate this recipe.");
    if (loading) return;

    setLoading(true);
    try {
      const data = await rateRecipeApi(recipeId, value, token);
      setUserVote(value);
      toast.success("Rating submitted successfully!");

      onRatingUpdate({
        averageRating: data.averageRating,
        ratingCount: data.ratingCount,
        userRating: value,
      });
    } catch (error) {
      console.error("Rating failed:", error);
      toast.error(error.response?.data?.message || "Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  const interactiveRating = hoverValue || userVote;

 return (
  <div className="relative flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg w-full max-w-sm border border-slate-100 overflow-hidden">
    
    {/* Subtle background decoration */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-30 -z-10" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
    
    {/* Title */}
    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
      Rate this recipe
    </h3>
    
    {/* Average rating display */}
    <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
      <Rating
        value={currentAvgRating}
        total={5}
        size={20}
        className="text-amber-500"
      />
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900">
          {Number(currentAvgRating)?.toFixed(1)}
        </span>
        <span className="text-sm font-medium text-slate-500">
          / 5
        </span>
      </div>
    </div>
    
    {/* Interactive stars */}
    <div className="flex gap-2 mt-2" aria-label="Rate this recipe">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <div
          key={starValue}
          className="relative group"
        >
          <Star
            size={32}
            fill={
              (hoverValue > 0 ? starValue <= hoverValue : starValue <= interactiveRating)
                ? "#F59E0B"
                : "none"
            }
            stroke="#F59E0B"
            strokeWidth={2}
            className={`cursor-pointer transition-all duration-300 ease-out ${
              loading 
                ? "opacity-40 cursor-not-allowed" 
                : "hover:scale-125 hover:rotate-12 active:scale-95"
            }`}
            onClick={() => handleRate(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
          />
          {/* Hover glow effect */}
          {!loading && (
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
          )}
        </div>
      ))}
    </div>
    
    {/* User rating & status */}
    <div className="min-h-[24px] flex items-center justify-center mt-1">
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      ) : userVote > 0 ? (
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
          <span className="text-sm font-semibold text-emerald-700">
            You rated: {Number(userVote)} ★
          </span>
        </div>
      ) : null}
    </div>
  </div>
);
};

export default DynamicRatingStars;
