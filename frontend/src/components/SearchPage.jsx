import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Star, Clock, ChefHat, ArrowLeft, ArrowRight } from "lucide-react";
import { fetchRecipeCards, fetchSearchRecipe } from "../../redux/slices/allCardSlice";
import Searchcontent from "./Searchcontent";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const itemsPerPage = 6;

  const dispatch = useDispatch();
  const { isLoading, recipe, searchRecipe, error } = useSelector((state) => state.RecipeCard);

  // Debounced search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch data based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      dispatch(fetchSearchRecipe(debouncedSearchTerm));
    } else {
      dispatch(fetchRecipeCards());
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [dispatch, debouncedSearchTerm]);

  // Memoized filtered recipes for better performance
  const { filteredRecipes, totalItems, totalPages } = useMemo(() => {
    const allRecipes = searchTerm.trim() 
      ? (Array.isArray(searchRecipe) ? searchRecipe : [])
      : (Array.isArray(recipe) ? recipe : []);

    // Client-side filtering as fallback
    const filtered = allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      filteredRecipes: filtered,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    };
  }, [recipe, searchRecipe, searchTerm]);

  // Get paginated recipes
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRecipes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRecipes, currentPage, itemsPerPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Triggered by form submit, but debounced search handles the actual search
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-green-500"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-green-300"></div>
          <div className="mt-6 text-center">
            <p className="text-slate-600 font-medium">Searching for delicious recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 text-xl font-semibold mb-2">Oops! Something went wrong</p>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grren-50 via-green-50 to-green-100">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-purple-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text  mb-4">
              Discover Amazing Recipes
            </h1>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Find your dish for any occasion with our curated collection of delicious recipes
            </p>
          </div>

          {/* Enhanced Search Section */}
          <div className="">
            <div className="max-w-2xl mx-auto relative">
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 ${
                isSearchFocused ? 'border-blue-300 shadow-xl scale-105' : 'border-white/20'
              }`}>
                <div className="flex items-center px-6 py-5">
                  <Search className={`h-6 w-6 transition-colors duration-300 ${
                    isSearchFocused ? 'text-green-500' : 'text-slate-400'
                  }`} />
                  <input 
                    type="text" 
                    placeholder="Search for recipes, ingredients, or cuisines..." 
                    className="flex-1 ml-4 text-lg text-slate-800 outline-none placeholder-slate-400 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <button 
                    onClick={handleSearch}
                    className="ml-4 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Results Header */}
        <div className="mb-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {searchTerm.trim() 
                ? `Found ${totalItems} recipe${totalItems !== 1 ? 's' : ''} for "${searchTerm}"`
                : `All Recipes (${totalItems})`}
            </h2>
            <div className="flex items-center space-x-4 text-slate-600">
              <div className="flex items-center space-x-1">
                <ChefHat className="w-4 h-4" />
                <span className="text-sm">Curated Collection</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span className="text-sm">Top Rated</span>
              </div>
            </div>
          </div>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-12 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No recipes found</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Try searching with different keywords or browse our featured recipes!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Recipe Cards - Using Flexbox instead of Grid */}
            <div className="flex flex-wrap -mx-3 mb-12">
              {paginatedRecipes.map((item, index) => (
                <div 
                  key={item._id} 
                  className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className=" backdrop-blur-sm rounded-3xl p-2 shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group">
                    <Searchcontent 
                      id={item._id}
                      title={item.title}
                      rating={item.rating}
                      image={item.image}
                      readyIn={item.readyIn}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                      <span className="font-medium">Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-1 px-2">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) pageNum = i + 1;
                        else if (currentPage <= 3) pageNum = i + 1;
                        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = currentPage - 2 + i;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-green-500 to-green-500 text-white shadow-lg transform scale-110"
                                : "text-slate-600 hover:bg-green-50 hover:text-green-600"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-green-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <span className="font-medium">Next</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default SearchPage;