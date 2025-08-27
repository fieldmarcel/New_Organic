
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../redux/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
const res = await api.post("/api/v1/users/login",         {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const data = await res.data;
      if (data.success) {
        toast.success(data.message);

        if (data.data) {
          dispatch(login());
          dispatch(setUser(data.data));
          localStorage.setItem("data", JSON.stringify(data.data));
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("userName", JSON.stringify(data.data.userName));
          navigate("/");
        } else {
          console.error("User data is missing in API response");
        }
      } else {
        console.error("Login failed:", data?.message);
      }
    } catch (error) {
      console.error("Login error: ", error?.message);

      if (error.response && error.response.data) {
        toast.error(error?.response?.data.message || "Login failed.");
      } else {
        console.log(error.message)
        toast.error(error?.response?.data.message || "Login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setEmail("guest@gmail.com");
    setPassword("12345");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-80"></div>
      </div>

      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/abc.jpg')",
          }}

        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md"
          >
            <h1 className="text-4xl font-bold mb-4">Welcome Back to HomeChef</h1>
            <p className="text-lg opacity-90 mb-8">
              Discover delicious recipes and connect with a community of food lovers.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Access to thousands of unique recipes</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Connect with food enthusiasts</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Save and organize your favorite dishes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 lg:p-0"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Sign In to HomeChef</h2>
            <p className="text-gray-600 mt-2">Your personal culinary journey awaits</p>
          </div>

          <div className="mb-8">
            <button 
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-all flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-2 px-4 bg-white border border-indigo-200 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                Continue as Guest <FaArrowRight className="text-xs" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-500 mt-10">
            &copy; {new Date().getFullYear()} HomeChef. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;