import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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

    const accessToken = localStorage.getItem("token");
    console.log("Access Token:", accessToken);

    try {
      const response = await axios.post( import.meta.env.VITE_BASE_URL +  "/api/v1/recipes", recipe, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      toast.success("Recipe submitted successfully!");
    } catch (error) {
      console.error("Error submitting recipe:", error.response?.data || error.message);
      toast.error("Failed to submit recipe. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-600" />
            Publish Your Recipe
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Title
              </label>
              <input
                name="title"
                placeholder="Enter recipe title"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <List className="w-4 h-4 text-green-600" />
                Sub Category
              </label>
              <input
                name="subCategory"
                placeholder="Enter sub category"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-600" />
                Rating (0-5)
              </label>
              <input
                name="rating"
                type="number"
                step="0.1"
                placeholder="Enter rating"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter recipe description"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                Cook Time (mins)
              </label>
              <input
                name="cookTime"
                type="number"
                placeholder="Enter cook time"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                Ready In (mins)
              </label>
              <input
                name="readyIn"
                type="number"
                placeholder="Enter ready in time"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-600" />
                Serving
              </label>
              <input
                name="serving"
                type="number"
                placeholder="Enter serving size"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <List className="w-4 h-4 text-green-600" />
                Ingredients (comma-separated)
              </label>
              <input
                name="ingredients"
                placeholder="Enter ingredients"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-600" />
                Cuisine
              </label>
              <input
                name="cuisine"
                placeholder="Enter cuisine"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Soup className="w-4 h-4 text-green-600" />
                Meal Type
              </label>
              <input
                name="mealType"
                placeholder="Enter meal type"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <List className="w-4 h-4 text-green-600" />
                Steps (comma-separated)
              </label>
              <textarea
                name="steps"
                placeholder="Enter steps"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                required
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Nutrition
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    name="nutrition.calories"
                    type="number"
                    placeholder="Enter calories"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fat (g)
                  </label>
                  <input
                    name="nutrition.fat"
                    type="number"
                    placeholder="Enter fat"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbs (g)
                  </label>
                  <input
                    name="nutrition.carbs"
                    type="number"
                    placeholder="Enter carbs"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protein (g)
                  </label>
                  <input
                    name="nutrition.protein"
                    type="number"
                    placeholder="Enter protein"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Image className="w-4 h-4 text-green-600" />
                Image URL 
              </label>
              <input
                name="image"
                type="url"
                placeholder="Enter image URL"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Publish Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}