// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logOut(state) {
      state.email = '';
      state.password = '';
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
