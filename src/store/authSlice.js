import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: !!localStorage.getItem("token"), // logged in if token exists
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload; // ✅ use payload directly
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
