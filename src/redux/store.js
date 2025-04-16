// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // adjust the path if needed

export const store = configureStore({
  reducer: {
    user: userReducer, // key: value pair
  },
});
