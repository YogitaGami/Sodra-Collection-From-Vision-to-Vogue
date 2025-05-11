import { createSlice } from "@reduxjs/toolkit";

// Define the reducer function
export const updateCartSlice = createSlice({
  name: "updateCart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.findIndex((item) => item.id === action.payload.id);
    
      if (existingItemIndex !== -1) {
        // Ensure we're not keeping any stale references to removed items
        state[existingItemIndex] = { ...action.payload, quantity: 1, checked: state[existingItemIndex].checked ?? true }; // Reset quantity to 1
      } else {
        state.push({ ...action.payload, quantity: 1, checked: true }); // Add new item properly
      }
    },

    removeItem: (state, action) => {
      const idsToRemove = Array.isArray(action.payload) ? action.payload : [action.payload];
      return state.filter((item) => !idsToRemove.includes(item.id)); // Remove items by ID
    },

    updateDays: (state, action) => {
      const { id, days } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.selectedDays = days; // Update selectedDays in Redux
        item.days = days; // Update days as well
      }
    },

    clearCart: () => {
      return []; // Reset cart to empty
    },
  },
});

// Export actions
export const { addItem, removeItem, updateDays, clearCart } = updateCartSlice.actions;

// Export reducer
export default updateCartSlice.reducer;
