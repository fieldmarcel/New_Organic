// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { BiSearch } from "react-icons/bi";

// const transition = {
//   type: "spring",
//   mass: 0.5,
//   damping: 11.5,
//   stiffness: 100,
//   restDelta: 0.001,
//   restSpeed: 0.001,
// };

// const DropdownMenu = ({ title, items }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//       className="relative cursor-pointer"
//     >
//       <p className="text-black dark:text-white hover:opacity-80">{title}</p>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: 5 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={transition}
//           className="absolute top-10 left-0 w-56 bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
//         >
//           <ul className="py-2">
//             {items.map((item, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// const Navbar = () => {
//   const [searchOpen, setSearchOpen] = useState(false);

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-black shadow-lg">
//       {/* Logo */}
//       <div className="text-2xl font-bold text-black dark:text-white">
//         RecipeBook
//       </div>

//       {/* Navigation Links */}
//       <div className="flex space-x-8">
//         {/* Recipes Dropdown */}
//         <DropdownMenu
//           title="Recipes"
//           items={[
//             "Breakfast & Brunch Recipes",
//             "Lunch Recipes",
//             "Appetizers & Snack Recipes",
//             "Dinner Recipes",
//             "Dessert Recipes",
//           ]}
//         />
//         {/* Cuisine Dropdown */}
//         <DropdownMenu
//           title="Cuisine"
//           items={[
//             "Mexican Recipes",
//             "Italian Recipes",
//             "Indian Recipes",
//             "Thai Recipes",
//             "Korean Recipes",
//             "French Recipes",
//             "Latin American Recipes",
//             "Chinese Recipes",
//             "Japanese Recipes",
//           ]}
//         />
//         {/* Healthy & Diet Dropdown */}
//         <DropdownMenu
//           title="Healthy & Diet"
//           items={[
//             "Keto Recipes",
//             "Healthy Recipes",
//             "Vegetarian Recipes",
//             "Vegan Recipes",
//             "Mediterranean Diet Recipes",
//             "Weight Watchers Recipes",
//             "Low-Carb Recipes",
//           ]}
//         />
//         {/* Other Links */}
//         <div className="text-black dark:text-white hover:opacity-80">Featured</div>
//         <div className="text-black dark:text-white hover:opacity-80">About</div>
//       </div>

//       {/* Search and Login */}
//       <div className="flex items-center space-x-6">
//         {/* Search Dropdown */}
//         <div
//           className="relative cursor-pointer"
//           onMouseEnter={() => setSearchOpen(true)}
//           onMouseLeave={() => setSearchOpen(false)}
//         >
//           <BiSearch size={24} className="text-black dark:text-white" />
//           {searchOpen && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 5 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={transition}
//               className="absolute top-8 right-0 w-64 bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
//             >
//               <form className="flex items-center p-2">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="flex-grow px-4 py-2 text-sm border rounded-l-lg outline-none dark:bg-gray-800 dark:text-white"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-white bg-orange-400 rounded-r-lg"
//                 >
//                   Search
//                 </button>
//               </form>
//             </motion.div>
//           )}
//         </div>

//         {/* Login Button */}
//         <button className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
//           Login
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
