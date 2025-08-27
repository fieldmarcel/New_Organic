import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "../components/ui/card";
import { Shuffle } from 'lucide-react'; // Icon for shuffling

const images = [
  { src: "/api/placeholder/400/300", alt: "Delicious Food 1", ratio: "3:2" },
  { src: "/api/placeholder/600/400", alt: "Delicious Food 2", ratio: "3:2" },
  { src: "/api/placeholder/300/400", alt: "Delicious Food 3", ratio: "3:4" },
  { src: "/api/placeholder/500/500", alt: "Delicious Food 4", ratio: "1:1" },
  { src: "/api/placeholder/400/600", alt: "Delicious Food 5", ratio: "2:3" },
  { src: "/api/placeholder/800/400", alt: "Delicious Food 6", ratio: "2:1" },
  { src: "/api/placeholder/350/500", alt: "Delicious Food 7", ratio: "7:10" },
  { src: "/api/placeholder/600/300", alt: "Delicious Food 8", ratio: "2:1" },
  { src: "/api/placeholder/500/400", alt: "Delicious Food 9", ratio: "5:4" },
];

const Gallery = () => {
  const [shuffledImages, setShuffledImages] = React.useState([...images]); 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Function to shuffle the images
  const shuffleImagesArray = () => {
    setShuffledImages([...shuffledImages].sort(() => Math.random() - 0.5));
  };

  // return (
    // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    //   <div className="flex justify-between items-center mb-8">
    //     <h2 className="text-4xl font-extrabold text-gray-900">
    //       Culinary Gallery
    //     </h2>
    //     <button
    //       onClick={shuffleImagesArray}
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
    //     >
    //       <Shuffle className="mr-2" /> Shuffle
    //     </button>
    //   </div>
    //   <p className="text-lg text-gray-600 mb-8">
    //     Explore a delightful collection of culinary masterpieces. Share your own
    //     and inspire the community!
    //   </p>

    //   <motion.div
    //     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    //     variants={containerVariants}
    //     initial="hidden"
    //     animate="visible"
    //   >
    //     {shuffledImages.map((image, index) => (
    //       <motion.div
    //         key={index}
    //         variants={cardVariants}
    //         whileHover="hover"
    //         className={`relative overflow-hidden rounded-xl shadow-md`} 
    //         style={{ aspectRatio: image.ratio }}
    //       >
    //         <img
    //           src={image.src}
    //           alt={image.alt}
    //           className="w-full h-full object-cover block"
    //         />
    //       </motion.div>
    //     ))}
    //   </motion.div>
    // </div>
  // );
};

export default Gallery;
