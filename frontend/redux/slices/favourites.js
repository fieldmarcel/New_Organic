
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/v1/recipes/favourites"; // Backend URL

// 1️⃣ Add to favourites (POST)
export const addToFavourites = createAsyncThunk(
    "favourites/addToFavourites",
    async (recipe, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, recipe);
            return response.data; // Returns added recipe
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add favourite");
        }
    }
);

// 2️⃣ Remove from favourites (DELETE)
export const removeFromFavourites = createAsyncThunk(
    "favourites/remove",
    async (id, { rejectWithValue }) => {
        try {
            await axios.post(import.meta.env.VITE_BASE_URL + `/api/v1/recipes/favourites/remove/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue("Failed to remove favourite");
        }
    }
);


// 3️⃣ Fetch all favourites (GET)
export const fetchFavourites = createAsyncThunk(
    "favourites/fetchFavourites",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data; // Returns list of favourites
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch favourites");
        }
    }
);

// 4️⃣ Remove all favourites (DELETE ALL)
export const removeAllFavourites = createAsyncThunk(
    "favourites/removeAllFavourites",
    async (_, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/all`);
            return []; // Return empty array to reset state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove all favourites");
        }
    }
);

// Initial State
const initialState = {
    favourites: [],
    status: "idle",
    error: null
};

// Create Slice
export const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {}, // We now use async actions
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favourites = action.payload;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addToFavourites.fulfilled, (state, action) => {
                state.favourites.push(action.payload);
            })
            .addCase(removeFromFavourites.fulfilled, (state, action) => {
                state.favourites = state.favourites.filter(item => item.id !== action.payload);
            })
            .addCase(removeAllFavourites.fulfilled, (state) => {
                state.favourites = [];
            });
    }
});

// Export Reducer
export default favouritesSlice.reducer;
