import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiTrash, BiPencil } from "react-icons/bi";
import {
  BiBookmark,
  BiHeart,
  BiShare,
  BiCog,
  BiLogOut,
  BiCheckCircle,
  BiRestaurant,
  BiHourglass,
  BiUserVoice,
} from "react-icons/bi";
import axios from "axios";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const { userName } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  const username = localStorage.getItem("userName")?.replace(/"/g, "") ?? "Guest";
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOwnProfile = username === userName;

  const handleDelete = async (recipeId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        toast.error("Please log in to delete recipes");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      toast.error("You can't delete this recipe");
      console.error("Delete Error:", error);
    }
  };

  const handleRemoveBookmark = async (recipeId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        toast.error("Please log in to remove bookmarks");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/recipes/${recipeId}/bookmark`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setBookmarkedRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== recipeId)
      );
      toast.success("Bookmark removed successfully!");
    } catch (error) {
      toast.error("Error removing bookmark");
      console.error("Bookmark Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const config = accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : {};

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/${userName}`,
          config
        );

        setUser(response.data.user);
        setRecipes(response.data.recipes || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
        toast.error("Failed to load user profile");
        setLoading(false);
      }
    };

    if (userName) {
      fetchUserData();
    }
  }, [userName]);

  useEffect(() => {
    if (activeTab === "saved") {
      const fetchBookmarkedRecipes = async () => {
        try {
          const accessToken = localStorage.getItem("token");
          const config = accessToken
            ? { headers: { Authorization: `Bearer ${accessToken}` } }
            : {};

          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/users/${userName}/bookmarks`,
            config
          );
          
          const validRecipes = (response.data.bookmarkedRecipes || []).filter(
            (recipe) => recipe !== null
          );
          setBookmarkedRecipes(validRecipes);
        } catch (error) {
          console.error("Failed to fetch bookmarked recipes:", error.message);
          toast.error("Failed to load saved recipes");
        }
      };

      fetchBookmarkedRecipes();
    }
  }, [activeTab, userName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-xl text-gray-600 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Cover Image with Enhanced Gradient */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={"/apple.jpg" || "default-image-url"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            {/* Left Column - User Info */}
            <div className="md:w-1/3 p-6 md:p-8 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100 bg-gradient-to-br from-green-50/50 to-transparent">
              <div className="relative mb-4">
                <motion.div 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-green-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={user.profileImage || "/cook.gif"}
                    alt={user.fullName || "User"}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <BiCheckCircle className="text-2xl" />
                </motion.div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 text-center md:text-left">
                {user.fullName || "Admin"}
              </h1>

              <p className="text-green-600 font-medium text-sm mb-3 text-center md:text-left">
                @{user.userName || userName}
              </p>

              <p className="text-gray-600 text-sm mb-6 text-center md:text-left leading-relaxed">
                {user.bio || "No bio available."}
              </p>

              <div className="flex justify-around w-full mb-6 gap-4">
                <motion.div 
                  className="text-center bg-white rounded-xl p-3 shadow-sm flex-1"
                  whileHover={{ y: -2, shadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                >
                  <p className="text-2xl font-bold text-green-600">
                    {recipes.length || 0}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Recipes</p>
                </motion.div>
                <motion.div 
                  className="text-center bg-white rounded-xl p-3 shadow-sm flex-1"
                  whileHover={{ y: -2, shadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                >
                  <p className="text-2xl font-bold text-orange-600">
                    {bookmarkedRecipes.length || 0}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Saved</p>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="md:w-2/3 p-6 md:p-8">
              {/* Enhanced Tabs */}
              <div className="border-b rounded-2xl border-gray-200 mb-6">
                <nav className="flex rounded-2xl items-center justify-center space-x-8">
                  {[
                    {
                      id: "recipes",
                      label: "My Recipes",
                      icon: <BiRestaurant />,
                    },
                    { id: "saved", label: "Saved", icon: <BiBookmark /> },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-2 flex items-center gap-2 border-b-2 font-semibold text-sm transition-all ${
                        activeTab === tab.id
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab.icon}
                      {tab.label}
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "recipes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recipes.length > 0 ? (
                      recipes.map((recipe, index) => (
                        <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                          <motion.div
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all relative group border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                          >
                            <div className="relative aspect-video overflow-hidden">
                              <img
                                src={recipe.image || "default-image-url"}
                                alt={recipe.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                              {/* ENHANCED Edit/Delete Buttons - Always Visible on Own Profile */}
                              {isOwnProfile && (
                                <div className="absolute top-3 right-3 flex gap-2">
                                  {/* Edit Button */}
                                  <motion.button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      navigate(`/recipe_settings/${recipe._id}`);
                                    }}
                                    className="bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center gap-1.5 font-semibold backdrop-blur-sm border-2 border-white/20"
                                    whileHover={{ scale: 1.08, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="Edit Recipe"
                                  >
                                    <BiPencil size={16} />
                                    <span className="text-xs">Edit</span>
                                  </motion.button>

                                  {/* Delete Button */}
                                  <motion.button
                                    onClick={(e) => handleDelete(recipe._id, e)}
                                    className="bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center gap-1.5 font-semibold backdrop-blur-sm border-2 border-white/20"
                                    whileHover={{ scale: 1.08, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="Delete Recipe"
                                  >
                                    <BiTrash size={16} />
                                    <span className="text-xs">Delete</span>
                                  </motion.button>
                                </div>
                              )}

                              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                <div>
                                  <h3 className="text-white font-bold text-lg drop-shadow-lg">
                                    {recipe.title}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-1 text-white/90 text-sm bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                  <BiHourglass /> {recipe.readyIn}
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                    {recipe.cuisine}
                                  </span>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800">
                                  {recipe.mealType}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-16 text-gray-500">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <BiRestaurant className="text-6xl mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">No recipes yet.</p>
                          <p className="text-sm text-gray-400 mt-2">Start creating delicious recipes!</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "saved" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookmarkedRecipes.length > 0 ? (
                      bookmarkedRecipes.map((recipe, index) =>
                        recipe && recipe._id ? (
                          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                            <motion.div
                              className="flex bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ y: -5, scale: 1.02 }}
                            >
                              <div className="w-2/5 overflow-hidden relative">
                                <img
                                  src={recipe.image || "default-image-url"}
                                  alt={recipe.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                              <div className="w-3/5 p-4 flex flex-col justify-between bg-gradient-to-br from-white to-green-50/30">
                                <div>
                                  <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-lg text-gray-800 mb-1 flex-1 line-clamp-2">
                                      {recipe.title}
                                    </h3>
                                    
                                    {isOwnProfile && (
                                      <motion.button
                                        onClick={(e) =>
                                          handleRemoveBookmark(recipe._id, e)
                                        }
                                        className="text-white rounded-2xl  bg-red-500 hover:bg-red-600 p-2  transition-all shadow-md flex-shrink-0"
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="Remove bookmark"
                                      >
                                        <BiTrash size={18} />
                                      </motion.button>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2 bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block font-medium">
                                    {recipe.cuisine}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-gray-600 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <BiHourglass /> {recipe.readyIn}
                                  </span>
                                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800">
                                    {recipe.mealType}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ) : null
                      )
                    ) : (
                      <div className="col-span-2 text-center py-16 text-gray-500">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <BiBookmark className="text-6xl mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">No saved recipes yet.</p>
                          <p className="text-sm text-gray-400 mt-2">Start bookmarking your favorites!</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Bottom Actions */}
      {isOwnProfile && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 flex justify-between items-center border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="text-gray-600 text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Member since Feb 2023
            </div>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold flex items-center gap-2 hover:from-red-600 hover:to-red-700 rounded-xl transition-all shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
            >
              <BiLogOut className="text-xl" />
              Sign Out
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;