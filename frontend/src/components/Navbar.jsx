import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Search, ChevronDown, Menu, X, User, Utensils, Globe, Info, LogOut, Settings, Plus, Heart,Bookmark } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = localStorage.getItem("userName")?.replace(/"/g, "") ?? "Guest";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleLogout = () => {
    localStorage.removeItem("data");
    dispatch(logout());
    navigate("/login")
  };
  const userId = localStorage.getItem("userName")?.replace(/"/g, ""); 
  return (
    <nav className="sticky top-0 ml-5 mr-5 rounded-full  bg-white/55 backdrop-blur-xl border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
            <img src="/Group 22 (6).svg" alt="logo" className="h-12 w-auto text-emerald-600" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors group">
                <Utensils className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Recipes </span>
                <ChevronDown className="h-4 w-4 mt-0.5 text-emerald-500 group-hover:rotate-180 transition-transform" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[240px] border border-emerald-50 bg-white shadow-xl rounded-xl p-3 mt-3">

                {["Breakfast", "Lunch", "Dinner","Snack","Dessert"].map((subCategory) => (
                  <DropdownMenuItem key={subCategory} className="p-0 hover:bg-emerald-50 rounded-lg">
                    <Link to={`/subCategory/${subCategory}`}  className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700">
                      <div className="h-2 w-2 bg-emerald-400 rounded-full" />
                      <span className="font-medium">{subCategory} Recipes</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors group">
                <Globe className="h-5 w-5 text-emerald-500" />
                <span className=" ">Cuisines</span>
                <ChevronDown className="h-4 w-4 mt-0.5 text-emerald-500 group-hover:rotate-180 transition-transform" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[240px] border border-emerald-50 bg-white shadow-xl rounded-xl p-3 mt-3">
                {["Indian", "Mexican", "Italian", "Pan-Asian"].map((cuisine) => (
                  <DropdownMenuItem key={cuisine} className="p-0 hover:bg-emerald-50 rounded-lg">
                    <Link to={`/cuisine/${cuisine}`} className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700">
                      <span className="text-lg">{cuisine === 'Indian' ? '🇮🇳' : cuisine === 'Mexican' ? '🇲🇽' : cuisine === 'Italian' ? '🇮🇹' : '🇹🇭'}</span>
                      <span className="font-medium">{cuisine} Cuisine</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/favourites" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <Bookmark className="h-5 w-5 text-emerald-500" />
              <span className="">Support Us</span>
            </Link>

            <Link to="/about" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <Info className="h-5 w-5 text-emerald-500" />
              <span className="">Community</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/search" className="p-2.5 hover:bg-emerald-50 rounded-full transition-colors">
              <Search className="h-6 w-6 text-brown-600" />
            </Link>

            {isAuth ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-emerald-50 px-4 py-2 rounded-full transition-colors">
                  <div className="h-9 w-9  bg-gradient-to-br  from-emerald-300 to-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
                    {username.charAt(0).toUpperCase()}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[240px] border border-emerald-50 bg-white shadow-xl rounded-xl p-2 mt-2">
                  <DropdownMenuLabel className="px-4 py-3 text-gray-500 text-sm">
                    Signed in as <span className="font-bold text-lg text-emerald-600 ">{username}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem className="p-0 hover:bg-emerald-50 rounded-lg">
                    <Link to={`/profile/${userId}`} className="flex items-center gap-3 hover:bg-green-400 rounded-full w-full px-4 py-2.5 text-gray-700 hover:text-white">
                      <User className="h-5 w-5 text-emerald-500 hover:text-white" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0 hover:bg-emerald-50 rounded-lg">
                    <Link to="/addRecipe" className="flex items-center hover:bg-green-400 rounded-full gap-3 w-full px-4 py-2.5 text-gray-700 hover:text-white">
                      <Plus className="h-5 w-5 text-emerald-500" />
                      <span>Add Recipe</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0 hover:bg-emerald-50 rounded-lg">
                    <Link to="/userSettings" className="flex items-center gap-3 hover:bg-green-400 rounded-full w-full px-4 py-2.5 text-gray-700 hover:text-white">
                      <Settings className="h-5 w-5 text-emerald-500 hover:text-white " />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100 hover:text-white" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="p-2.5 hover:bg-emerald-50 rounded-full transition-colors">
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            )}

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2.5 hover:bg-emerald-50 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-slideDown">
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-3 bg-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Utensils className="h-5 w-5 text-emerald-500" />
                      <span className="font-medium text-gray-700">Recipes</span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-emerald-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full border-none shadow-none">
                    {["Breakfast", "Lunch", "Dinner", "Dessert"].map((item) => (
                      <DropdownMenuItem key={item} className="p-0 hover:bg-emerald-50">
                        <Link to={`/recipes/${item.toLowerCase()}`} className="w-full px-4 py-3 text-gray-700">
                          {item} Recipes
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-3 bg-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-emerald-500" />
                      <span className="font-medium text-gray-700">Cuisines</span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-emerald-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full border-none shadow-none">
                    {["Indian", "Mexican", "Italian", "Thai"].map((cuisine) => (
                      <DropdownMenuItem key={cuisine} className="p-0 hover:bg-emerald-50">
                        <Link to={`/cuisines/${cuisine.toLowerCase()}`} className="w-full px-4 py-3 text-gray-700">
                          {cuisine} Cuisine
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to="/favourites" className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 rounded-xl">
                  <Bookmark className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-gray-700">Bookmarks</span>
                </Link>

                <Link to="/about" className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 rounded-xl">
                  <Info className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-gray-700">About</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;