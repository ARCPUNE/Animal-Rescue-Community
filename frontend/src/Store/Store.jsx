// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  }
});

export default store;
