// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    email: null,
    password: null,
    phoneNo: null,
    role: null,
    address: null,
  },

  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },

    logOut: () => {
      return {
        id: null,
        name: null,
        email: null,
        password: null,
        phone_no: null,
        role: null,
        address: null,
      };
    },
  },
});

export const { login, logOut } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
