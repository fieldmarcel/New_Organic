

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FollowButton = () => {
  const { userName } = useParams(); // Get userName from the URL
  const [isFollowing, setIsFollowing] = useState(false);

  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("token");

  // Check if the authenticated user is following the profile user
 
  // Handle follow/unfollow
  const handleFollow = async () => {
    try {
      if (!accessToken) {
        console.error("User not authenticated");
        return;
      }

      if (isFollowing) {
        await axios.post(
          import.meta.env.VITE_BASE_URL + `/api/v1/users/${userName}/unfollow`,
          {}, // No need to send userId in the body since it's extracted from the token
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          }
        );
      } else {
        await axios.post(
          `http://localhost:8081/api/v1/users/${userName}/follow`,
          {}, // No need to send userId in the body since it's extracted from the token
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          }
        );
      }
      setIsFollowing(!isFollowing); 
    } catch (error) {
      console.error("Failed to update follow status:", error.message);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 ${
        isFollowing ? "bg-red-500" : "bg-green-500"
      } text-white rounded-full font-medium flex items-center gap-2 shadow-md hover:bg-${
        isFollowing ? "red-600" : "green-600"
      } transition-all`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;