import React from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Utensils,
  Search,
  Leaf,
  Salad,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute -top-24 left-10 opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Leaf className="w-24 h-24 text-green-400 rotate-45" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 group"
        >
          <div className="relative bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-2xl mx-auto overflow-hidden">
            {/* Border Beam Animation */}
            <BorderBeam
              size={150}
              duration={8}
              borderWidth={2.5}
              colorFrom="#4ade80"
              colorTo="#16a34a"
              className="rounded-2xl -inset-0.5"
            />

            {/* Header Section */}
            <motion.h3
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"
            >
              <Search className="w-7 h-7 text-green-600" />
              Discover Your Next Culinary Adventure
            </motion.h3>

            {/* Description and Button Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-lg md:text-base md:max-w-[70%]">
                Explore a world of flavors and recipes. Just click the button right to start your journey!
              </p>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Link to="/search" className="flex justify-center items-center gap-3">
                  <Search className="w-10 h-10" />
                  <span className="text-sm">Search Recipes</span>
                </Link>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <ChefHat className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700 font-logo">
                FoodChef
              </span>
            </motion.div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cultivating sustainable cooking practices and healthy recipes for
              modern lifestyles.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://facebook.com/foodchef"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 hover:text-green-600 cursor-pointer"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/foodchef"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 hover:text-green-600 cursor-pointer"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com/foodchef"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 hover:text-green-600 cursor-pointer"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Explore Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Utensils className="w-6 h-6 text-green-600" />
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Recipes", link: "/recipes" },
                { name: "Techniques", link: "/techniques" },
                { name: "Ingredients", link: "/ingredients" },
                { name: "Chef Network", link: "/chef-network" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-600 hover:text-green-700 transition-colors"
                >
                  <Link to={item.link} className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Salad className="w-6 h-6 text-green-600" />
              Connect
            </h3>
            <div className="space-y-2">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-600"
              >
                <Mail className="w-5 h-5 text-green-500" />
                <a href="mailto:contact@foodchef.com">contact@foodchef.com</a>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-600"
              >
                <Phone className="w-5 h-5 text-green-500" />
                <a href="tel:+918840226477">+91 8840226477</a>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              Newsletter
            </h3>
            <p className="text-sm text-gray-600">
              Get seasonal recipes and sustainable cooking tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none bg-white/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-sm absolute right-2 top-3 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-green-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Shivanshu Tripathi. All rights reserved.
          </div>

          <div className="flex gap-4">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <ChefHat className="w-5 h-5 text-green-600" />
              <span>500+ Recipes</span>
            </motion.div>
            <motion.div
              whileHover={{ rotate: -15 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <Leaf className="w-5 h-5 text-green-600" />
              <span>100% Fresh</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute bottom-10 right-20 opacity-10"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Leaf className="w-32 h-32 text-green-900" />
      </motion.div>
    </footer>
  );
};

export default Footer;