// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: window.localStorage.getItem('user'),
  },

  reducers: {

    login:(state,action) =>{
      state.user = action.payload; 
    },

    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;