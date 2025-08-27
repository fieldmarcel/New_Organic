import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import recipeCardSlice from "./slices/allCardSlice";
import favouritesSlice from "./slices/favourites";
const store = configureStore({
  reducer: {
    auth: authSlice,
    RecipeCard: recipeCardSlice,
    favourites: favouritesSlice,
  },
});

export default store;
 