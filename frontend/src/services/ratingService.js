// services/ratingService.js (This is the corrected API function)

import axios from "axios";

// Helper function to get the base URL (copied from previous logic)
const getBaseUrl = () => {
    // Ensure you define VITE_BASE_URL in your .env file
    return import.meta.env.VITE_BASE_URL; 
};

/**
 * Submits or updates a user's rating for a specific recipe.
 * @param {string} recipeId - The ID of the recipe being rated.
 * @param {number} value - The rating value (1-5).
 * @param {string} token - The user's authentication token.
 * @returns {Promise<object>} The response data with new averageRating and ratingCount.
 */
export const rateRecipeApi = async (recipeId, value, token) => {
  try {
    if (!token) {
        throw new Error("Authentication token is missing.");
    }
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    };

    const body = { 
        recipeId, 
        value,
    }; 

    const response = await axios.post(
      `${getBaseUrl()}/api/v1/rating/rate`,
      body,
      config
    );
    // Return the successful response data
    return response.data;
  } catch (error) {
    // Throw only the relevant error message for the frontend
    // Use optional chaining for safe access
    throw error.response?.data?.message || "Rating failed due to a network or server error.";
  }
};

// Export the function to be used by React components
// (Note: The <Rating rate={4.5} /> line is removed as this is a service file)
// export default rateRecipeApi; // Or use named export 'export const rateRecipeApi'