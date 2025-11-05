import { useState } from "react";
import {
  BookOpen,
  Clock,
  Utensils,
  Heart,
  List,
  Globe,
  Soup,
  FileText,
  Image,
  Plus,
  ChefHat,
} from "lucide-react";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    subCategory: "",
    title: "",
    rating: "",
    description: "",
    cookTime: "",
    readyIn: "",
    serving: "",
    ingredients: "",
    nutrition: { calories: "", fat: "", carbs: "", protein: "" },
    cuisine: "",
    mealType: "",
    steps: "",
    image: "",
    userId: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("nutrition.")) {
      const field = name.split(".")[1];
      setRecipe((prev) => ({
        ...prev,
        nutrition: { ...prev.nutrition, [field]: value },
      }));
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Recipe submitted:", recipe);
    alert("Recipe submitted successfully! 🎉");
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-8 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="sm:text-4xl text-2xl font-bold text-slate-800">Publish Your Recipe</h1>
              <p className="text-slate-500 mt-1">Share your culinary masterpiece with the world</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Recipe Title
                </label>
                <input
                  name="title"
                  placeholder="e.g., Grandma's Classic Chocolate Cake"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sub Category
                </label>
                <input
                  name="subCategory"
                  placeholder="e.g., Desserts, Appetizers"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Rating (0-5)
                </label>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  placeholder="4.5"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us what makes this recipe special..."
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                  rows="4"
                  required
                />
              </div>
            </div>
          </div>

          {/* Time & Serving */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Cook Time</h3>
              </div>
              <input
                name="cookTime"
                type="number"
                placeholder="30"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                required
              />
              <span className="text-sm text-slate-500 mt-2 block">minutes</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Ready In</h3>
              </div>
              <input
                name="readyIn"
                type="number"
                placeholder="45"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
              />
              <span className="text-sm text-slate-500 mt-2 block">minutes</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Utensils className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Servings</h3>
              </div>
              <input
                name="serving"
                type="number"
                placeholder="4"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                required
              />
              <span className="text-sm text-slate-500 mt-2 block">people</span>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <List className="w-5 h-5 text-green-600" />
              Recipe Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ingredients
                </label>
                <input
                  name="ingredients"
                  placeholder="e.g., 2 cups flour, 1 cup sugar, 3 eggs"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                  required
                />
                <span className="text-sm text-slate-500 mt-1 block">Separate with commas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    Cuisine
                  </label>
                  <input
                    name="cuisine"
                    placeholder="e.g., Italian, Mexican, Asian"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Soup className="w-4 h-4 text-green-600" />
                    Meal Type
                  </label>
                  <input
                    name="mealType"
                    placeholder="e.g., Breakfast, Lunch, Dinner"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cooking Steps
                </label>
                <textarea
                  name="steps"
                  placeholder="Describe the cooking process step by step..."
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
                  rows="6"
                  required
                />
                <span className="text-sm text-slate-500 mt-1 block">Separate steps with commas</span>
              </div>
            </div>
          </div>

          {/* Nutrition Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Nutrition Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <label className="block text-sm font-semibold text-red-700 mb-2">
                  Calories
                </label>
                <input
                  name="nutrition.calories"
                  type="number"
                  placeholder="250"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  required
                />
                <span className="text-xs text-red-600 mt-1 block">kcal</span>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                <label className="block text-sm font-semibold text-yellow-700 mb-2">
                  Fat
                </label>
                <input
                  name="nutrition.fat"
                  type="number"
                  placeholder="10"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                  required
                />
                <span className="text-xs text-yellow-600 mt-1 block">grams</span>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  Carbs
                </label>
                <input
                  name="nutrition.carbs"
                  type="number"
                  placeholder="30"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
                <span className="text-xs text-blue-600 mt-1 block">grams</span>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <label className="block text-sm font-semibold text-green-700 mb-2">
                  Protein
                </label>
                <input
                  name="nutrition.protein"
                  type="number"
                  placeholder="15"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  required
                />
                <span className="text-xs text-green-600 mt-1 block">grams</span>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Image className="w-5 h-5 text-green-600" />
              Recipe Image
            </h2>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setRecipe({ ...recipe, imageFile: e.target.files[0] })}
                className="w-full"
                required
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-full mb-3">
                    <Image className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">Click to upload an image</p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 10MB</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-center">
            <button
              type="submit"
              className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-md"
            >
              <Plus className="w-6 h-6" />
              Publish Recipe
            </button>
            <p className="text-white text-sm mt-4 opacity-90">
              Your recipe will be reviewed before publication
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}