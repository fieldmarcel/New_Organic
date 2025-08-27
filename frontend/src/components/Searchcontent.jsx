

import React, { useState } from "react";
import { Link } from "react-router-dom";

const FoodSearchCard = ({ id, subCategory,image, readyIn, rating, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative w-full max-w-sm mx-auto bg-[#f9f5f0] border-3 border-gray-200 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/recipe/${id}`} className="block">
        <div className="relative w-full pt-[66%] overflow-hidden">
          <img 
            src={image || "/placeholder-food.jpg"} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {isHovered && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center space-x-4 z-10">
              <button className="bg-white/80 p-3 rounded-full hover:bg-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="p-4 ">
<h4 className="text-gray-800 line-clamp-2">{subCategory}</h4>
          <h3 className="text-2xl font-bold text-gray-800 line-clamp-2 mb-3">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="text-sm">{readyIn}</span>
              </span>
              
              <span className="flex items-center space-x-1 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span className="text-sm">{rating}</span>
              </span>
            </div>

            <button className="bg-red-50 p-2.5 rounded-full hover:bg-red-100 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-red-400 hover:text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.74 0 3.41.81 4.5 2.09C11.09 5.81 12.76 5 14.5 5 16.58 5 18 6.42 18 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FoodSearchCard;