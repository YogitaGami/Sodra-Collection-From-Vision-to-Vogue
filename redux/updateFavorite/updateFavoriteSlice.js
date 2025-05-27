import { createSlice } from "@reduxjs/toolkit";

// Define the reducer function
export const updateFavoriteSlice = createSlice({
  name: "updateFavorite",
  initialState: [],
  reducers: {
    toggleFavoriteItem: (state, action) => {
      const exists = state.some((item) => item.id === action.payload.id);
      return exists
        ? state.filter((item) => item.id !== action.payload.id)
        : [...state, action.payload];
    },
    addToFavoritesIfNotExists: (state, action) => {
      const exists = state.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const idsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.filter((item) => !idsToRemove.includes(item.id));
    },
    clearFavorite: () => [],
  },
});

// Export actions
export const { toggleFavoriteItem, addToFavoritesIfNotExists, removeItem, clearFavorite } =
  updateFavoriteSlice.actions;

// Export reducer
export default updateFavoriteSlice.reducer;
