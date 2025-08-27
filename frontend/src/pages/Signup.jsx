import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
       import.meta.env.VITE_BASE_URL + "api/v1/users/register",
        {
          userName,
          email,
          password,
          fullName,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Signup has failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during signup");
      console.error(
        "There's an error during signup:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative flex-1 hidden lg:block">
        <img
          src="/abc.jpg"
          alt="Signup visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-gray-900/70"></div>
        
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <div>
            <h1 className="text-3xl font-bold">HomeChef</h1>
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">Discover the joy of cooking at home</h2>
            <p className="text-xl text-gray-200">
              Join thousands of food enthusiasts creating amazing dishes in their kitchens.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-sm font-medium">10,000+</p>
              <p className="text-xs opacity-80">Recipes</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-sm font-medium">50,000+</p>
              <p className="text-xs opacity-80">Users</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-sm font-medium">4.9/5</p>
              <p className="text-xs opacity-80">Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Create Your Account</h2>
            <p className="mt-2 text-md text-gray-600">
              Join HomeChef and start your culinary journey
            </p>
          </div>
          
          <form onSubmit={handleSignup} className="bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-100">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Your full name"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </div>
            
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
                Facebook
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
              Sign in
            </Link>
          </p>
          
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>By signing up, you agree to our</p>
            <p className="mt-1">
              <Link to="/terms" className="text-green-600 hover:text-green-700 transition-colors duration-200">Terms of Service</Link> and{" "}
              <Link to="/privacy" className="text-green-600 hover:text-green-700 transition-colors duration-200">Privacy Policy</Link>
            </p>
            <p className="mt-4">
              &copy; {new Date().getFullYear()} HomeChef. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;  