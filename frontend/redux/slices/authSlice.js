import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  user: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("data");
      localStorage.removeItem("token");
    },
  },
});

export const { login, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
