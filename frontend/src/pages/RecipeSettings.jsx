import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BiImageAdd, BiArrowBack } from "react-icons/bi";
// Importing icons to match Recipe.jsx style
import { 
  Clock, Users, Flame, Droplets, Wheat, Star, 
  Utensils, FileText, Save, ChefHat 
} from "lucide-react";

const RecipeSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  
  // Initial State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subCategory: "",
    cookTime: "",
    readyIn: "",
    serving: "",
    cuisine: "",
    mealType: "",
    ingredients: "", 
    steps: "",
    image: null,
    // Broken down nutrition fields
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  // Fetch Existing Data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/recipes/${id}`);
        const data = response.data.recipe;

        setFormData({
          title: data.title,
          description: data.description,
          subCategory: data.subCategory,
          cookTime: data.cookTime,
          readyIn: data.readyIn,
          serving: data.serving,
          cuisine: data.cuisine,
          mealType: data.mealType,
          ingredients: data.ingredients.join(", "),
          steps: Array.isArray(data.steps) ? data.steps.join("\n") : data.steps,
          // Extract nutrition data safely
          calories: data.nutrition?.calories || "",
          protein: data.nutrition?.protein || "",
          carbs: data.nutrition?.carbs || "",
          fat: data.nutrition?.fat || ""
        });
        
        setImagePreview(data.image); 
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch recipe details");
        navigate(-1); 
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Updating recipe...");

    try {
      const accessToken = localStorage.getItem("token");
      const data = new FormData();

      // Construct Nutrition Object
      const nutritionData = {
        calories: formData.calories,
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat
      };

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        // Skip individual nutrition fields and image (handled separately)
        if (key !== "image" && !["calories", "protein", "carbs", "fat"].includes(key)) {
          data.append(key, formData[key]);
        }
      });

      // Append constructed nutrition object as string
      data.append("nutrition", JSON.stringify(nutritionData));

      // Append image only if a new one was selected
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/recipes/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss(loadToast);
      toast.success("Recipe updated successfully!");
      // Clean up username for URL
      const userName = localStorage.getItem("userName")?.replace(/"/g, "") || "user";
      navigate("/profile/" + userName); 
    } catch (error) {
      toast.dismiss(loadToast);
      console.error(error);
      toast.error(error.response?.data?.message || "Not authorised to update this recipe");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
       <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-white p-6 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
             <BiArrowBack size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ChefHat className="text-emerald-600" />
            Edit Recipe
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Top Section: Image & Basic Info */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Image Upload Section */}
            <div className="lg:w-1/3 flex flex-col gap-2">
              <label className="font-semibold text-slate-700">Recipe Image</label>
              <div className="relative w-full h-80 bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 hover:border-emerald-500 transition-colors group">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <BiImageAdd size={50} className="mb-2" />
                    <p>Upload Image</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer pointer-events-none">
                  <span className="font-medium">Change Image</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>
              <p className="text-xs text-slate-500 text-center">Recommended: 800x600px or larger</p>
            </div>

            {/* Basic Details Inputs */}
            <div className="lg:w-2/3 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Recipe Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Sub Category</label>
                  <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" required></textarea>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Clock size={12}/> Cook Time</label>
                    <input type="text" name="cookTime" value={formData.cookTime} onChange={handleChange} placeholder="e.g. 30 min" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Clock size={12}/> Ready In</label>
                    <input type="text" name="readyIn" value={formData.readyIn} onChange={handleChange} placeholder="e.g. 45 min" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Users size={12}/> Servings</label>
                    <input type="number" name="serving" value={formData.serving} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Utensils size={12}/> Cuisine</label>
                    <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                 </div>
              </div>
              
              <div className="space-y-1">
                 <label className="text-sm font-semibold text-slate-700">Meal Type</label>
                 <input type="text" name="mealType" value={formData.mealType} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Nutrition Section - Styled like Cards */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> Nutrition Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Calories */}
              <div className="flex flex-col p-4 bg-orange-50 rounded-2xl border border-orange-100 relative group focus-within:ring-2 focus-within:ring-orange-300 transition-all">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm text-orange-600"><Flame size={18}/></div>
                    <span className="text-sm font-semibold text-slate-600">Calories</span>
                 </div>
                 <input type="text" name="calories" value={formData.calories} onChange={handleChange} placeholder="e.g. 450" className="bg-transparent text-2xl font-bold text-slate-800 placeholder-orange-200 outline-none w-full" />
                 <span className="absolute bottom-4 right-4 text-xs font-bold text-orange-300">KCAL</span>
              </div>

              {/* Protein */}
              <div className="flex flex-col p-4 bg-red-50 rounded-2xl border border-red-100 relative group focus-within:ring-2 focus-within:ring-red-300 transition-all">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm text-red-600"><Droplets size={18}/></div>
                    <span className="text-sm font-semibold text-slate-600">Protein</span>
                 </div>
                 <input type="text" name="protein" value={formData.protein} onChange={handleChange} placeholder="e.g. 20" className="bg-transparent text-2xl font-bold text-slate-800 placeholder-red-200 outline-none w-full" />
                 <span className="absolute bottom-4 right-4 text-xs font-bold text-red-300">GRAMS</span>
              </div>

              {/* Carbs */}
              <div className="flex flex-col p-4 bg-amber-50 rounded-2xl border border-amber-100 relative group focus-within:ring-2 focus-within:ring-amber-300 transition-all">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm text-amber-600"><Wheat size={18}/></div>
                    <span className="text-sm font-semibold text-slate-600">Carbs</span>
                 </div>
                 <input type="text" name="carbs" value={formData.carbs} onChange={handleChange} placeholder="e.g. 40" className="bg-transparent text-2xl font-bold text-slate-800 placeholder-amber-200 outline-none w-full" />
                 <span className="absolute bottom-4 right-4 text-xs font-bold text-amber-300">GRAMS</span>
              </div>

              {/* Fat */}
              <div className="flex flex-col p-4 bg-yellow-50 rounded-2xl border border-yellow-100 relative group focus-within:ring-2 focus-within:ring-yellow-300 transition-all">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm text-yellow-600"><Star size={18}/></div>
                    <span className="text-sm font-semibold text-slate-600">Fat</span>
                 </div>
                 <input type="text" name="fat" value={formData.fat} onChange={handleChange} placeholder="e.g. 15" className="bg-transparent text-2xl font-bold text-slate-800 placeholder-yellow-200 outline-none w-full" />
                 <span className="absolute bottom-4 right-4 text-xs font-bold text-yellow-300">GRAMS</span>
              </div>

            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Text Areas for Steps and Ingredients */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="font-bold text-slate-700 flex items-center gap-2">
                  <Utensils size={18} className="text-emerald-600"/> Ingredients
               </label>
               <p className="text-xs text-slate-400">Separate ingredients with commas (e.g. 2 eggs, 1 cup flour)</p>
               <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} className="p-4 border border-slate-200 rounded-xl w-full h-64 focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm leading-relaxed"></textarea>
            </div>

            <div className="space-y-2">
               <label className="font-bold text-slate-700 flex items-center gap-2">
                  <FileText size={18} className="text-emerald-600"/> Instructions
               </label>
               <p className="text-xs text-slate-400">Write each step on a new line</p>
               <textarea name="steps" value={formData.steps} onChange={handleChange} className="p-4 border border-slate-200 rounded-xl w-full h-64 focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm leading-relaxed"></textarea>
            </div>
          </div>

          <div className="pt-4">
             <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-all shadow-lg shadow-emerald-200 transform hover:-translate-y-1">
                <Save size={20} /> Save Changes
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RecipeSettings;