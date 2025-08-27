import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipeCards = createAsyncThunk(
  "fetchRecipeCards",
  async () => {
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/api/v1/recipes");
    return response.json();
  }
);

export const fetchSearchRecipe= createAsyncThunk("fetchSearchRecipe",
  async (searchTerm) =>{

    const response = await fetch (import.meta.env.VITE_BASE_URL + `/api/v1/recipes/search?query=${encodeURIComponent(searchTerm)}`)

    const data = await response.json();
    console.log("API Response:", data); 
    console.log("Base URL:", import.meta.env.VITE_BASE_URL);
    return data;
  }
)


const recipeCardSlice = createSlice({
  name: "RecipeCard",
  //The initial state represents the state before any API call happens.

  initialState: {
    isLoading: false,
    // The request is not in progress initially.
    recipe: [],
    searchRecipe: [],
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRecipeCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecipeCards.fulfilled, (state, action) => {
      console.log("API Response Received:", action.payload); 

      (state.isLoading = false);
      (state.recipe = action.payload);
      // Assuming the API returns { recipes: [...] }
    });
    builder.addCase(fetchRecipeCards.rejected, (state, action) => {
      (state.error = true);
        (state.isLoading = false);
        console.log("error", action.payload);
    });
  




    builder.addCase(fetchSearchRecipe.pending,(state)=>{
        state.isLoading = true;
    })
    builder.addCase(fetchSearchRecipe.fulfilled,(state,action)=>{
    (state.isLoading = false);
    (state.searchRecipe= action.payload);
    
    
    })
    builder.addCase(fetchSearchRecipe.rejected,(state,action)=>{
        (state.error= action.error.message);
        (state.isLoading = false);
        console.log("error",  error.message ,action.payload)
      })
    }
    });



export default recipeCardSlice.reducer;
