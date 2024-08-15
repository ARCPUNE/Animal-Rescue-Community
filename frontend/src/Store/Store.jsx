// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/userSlice';
import authReducer from '../Features/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
