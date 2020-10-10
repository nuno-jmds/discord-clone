import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user", //this is the name of the slice
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectuser = (state) => state.user.user;

export default userSlice.reducer;
