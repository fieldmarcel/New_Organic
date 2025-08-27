// import React, { useState, useEffect } from "react";
// import { Send, MessageCircle, Clock, Heart, Users } from "lucide-react";
// import socket from "@/utils/socket";

// const LiveFeed = () => {
//   const [posts, setPosts] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [isPosting, setIsPosting] = useState(false);

//   const handlePost = (e) => {
//     e.preventDefault();
//     if (msg.trim() === "") return;
    
//     setIsPosting(true);
    
//     // Send to server via socket
//     socket.emit("sendPost", { message: msg });
//     setMsg("");
    
//     // Reset posting state after a short delay
//     setTimeout(() => {
//       setIsPosting(false);
//     }, 500);
//   };

//   const handleLike = (postId) => {
//     setPosts(prevPosts => 
//       prevPosts.map(post => 
//         post._id === postId 
//           ? { ...post, likes: (post.likes || 0) + 1, liked: true } 
//           : post
//       )
//     );
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "Just now";
    
//     const now = new Date();
//     const postTime = new Date(timestamp);
//     const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
//     if (diffInMinutes < 1) return "Just now";
//     if (diffInMinutes < 60) return `${diffInMinutes}m`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
//     return `${Math.floor(diffInMinutes / 1440)}d`;
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handlePost(e);
//     }
//   };

//   const getUserInitial = (user) => {
//     if (!user || user === 'Anonymous') return 'A';
//     return user.charAt(0).toUpperCase();
//   };

//   const getUserName = (user) => {
//     return user || 'Anonymous';
//   };

//   useEffect(() => {
//     // Request all posts upon component mount
//     socket.emit("getAllPosts");

//     // Listen for allPosts event from the server
//     socket.on("allPosts", (allPosts) => {
//       // Sort posts by time (newest first) if they have timestamps
//       const sortedPosts = allPosts.sort((a, b) => {
//         if (!a.time && !b.time) return 0;
//         if (!a.time) return 1;
//         if (!b.time) return -1;
//         return new Date(b.time) - new Date(a.time);
//       });
//       setPosts(sortedPosts);
//     });

//     // Listen for new posts in real-time
//     socket.on("newPost", (newPost) => {
//       setPosts(prevPosts => [newPost, ...prevPosts]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off("allPosts");
//       socket.off("newPost");
//     };
//   }, []);

//   return (
//     <div className="h-screen bg-gray-50 flex flex-col">
//       {/* Static Header */}
//       <div className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                 <MessageCircle className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">🍲 Community Feed</h1>
//                 <p className="text-sm text-gray-600">Share your food thoughts with the community</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium text-green-700">Live</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Static Post Creation */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <form onSubmit={handlePost} className="flex space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
//               <span className="text-white font-semibold">Y</span>
//             </div>
//             <div className="flex-1">
//               <textarea
//                 value={msg}
//                 onChange={(e) => setMsg(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Share your food thoughts..."
//                 className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 rows={2}
//                 disabled={isPosting}
//               />
//               <div className="flex items-center justify-between mt-3">
//                 <div className="flex items-center space-x-2">
//                   <Users className="w-4 h-4 text-gray-400" />
//                   <span className="text-sm text-gray-500">Community</span>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={msg.trim() === "" || isPosting}
//                   className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
//                 >
//                   {isPosting ? (
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                   <span>{isPosting ? "Posting..." : "Post"}</span>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Posts Feed */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
//           {posts.map((post) => (
//             <div key={post._id || post.time} className="bg-white rounded-xl shadow-sm p-4">
//               <div className="flex space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                   <span className="text-white font-semibold">
//                     {getUserInitial(post.user)}
//                   </span>
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <span className="font-medium text-gray-900">
//                       {getUserName(post.user)}
//                     </span>
//                     <span className="text-gray-500 text-sm">•</span>
//                     <span className="text-gray-500 text-sm flex items-center">
//                       <Clock className="w-3 h-3 mr-1" />
//                       {formatTime(post.time)}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-gray-800">{post.message}</p>
//                   <div className="mt-3 flex items-center">
//                     <button 
//                       onClick={() => handleLike(post._id || post.time)}
//                       className={`flex items-center space-x-1 text-sm ${post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
//                     >
//                       <Heart className="w-4 h-4" fill={post.liked ? 'currentColor' : 'none'} />
//                       <span>{post.likes || 0}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CommunityFeed = () => {
//   return (
//     <div className="min-h-screen font-sans">
//       <LiveFeed />
//     </div>
//   );
// };

// export default CommunityFeed;
import React from 'react'

const LiveFeed = () => {
  return (
    <div></div>
  )
}

export default LiveFeed