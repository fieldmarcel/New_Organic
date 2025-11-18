import React from "react";
import { Star, StarHalf, Star as StarEmpty } from "lucide-react";

const StaticRating = ({ averageRating = 0, ratingCount = null, onClick }) => {
  const safeRating = Number(averageRating) || 0;

  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div 
      onClick={onClick} 
      className="group inline-flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105"
    >
      {/* Stars container */}
      <div className="flex gap-0.5">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <Star 
              key={`full-${i}`} 
              size={22} 
              fill="#F59E0B" 
              stroke="#F59E0B"
              strokeWidth={1.5}
              className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{ transitionDelay: `${i * 30}ms` }}
            />
          ))}

        {hasHalfStar && (
          <StarHalf 
            size={22} 
            fill="#F59E0B" 
            stroke="#F59E0B"
            strokeWidth={1.5}
            className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
            style={{ transitionDelay: `${fullStars * 30}ms` }}
          />
        )}

        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarEmpty
              key={`empty-${i}`}
              size={22}
              fill="none"
              stroke="#D1D5DB"
              strokeWidth={1.5}
              className="transition-all duration-300 group-hover:scale-110"
              style={{ transitionDelay: `${(fullStars + (hasHalfStar ? 1 : 0) + i) * 30}ms` }}
            />
          ))}
      </div>

      {/* Rating text */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-slate-900 tabular-nums">
          {safeRating?.toFixed(1)}
        </span>
        {ratingCount !== null && (
          <>
            <span className="text-slate-400 font-medium">·</span>
            <span className="text-sm font-medium text-slate-600 tabular-nums">
              {ratingCount} {ratingCount === 1 ? 'vote' : 'votes'}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default StaticRating;