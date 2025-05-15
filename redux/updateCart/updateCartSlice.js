import { createSlice } from "@reduxjs/toolkit";

// Define the reducer function
export const updateCartSlice = createSlice({
  name: "updateCart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state[existingItemIndex];
        // Ensure we're not keeping any stale references to removed items
        state[existingItemIndex] = {
          ...existingItem,
          ...action.payload,
          quantity: 1,
          checked: state[existingItemIndex].checked ?? true,
        }; // Reset quantity to 1
      } else {
        state.push({ ...action.payload, quantity: 1, checked: true }); // Add new item properly
      }
    },

    removeItem: (state, action) => {
      const idsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.filter((item) => !idsToRemove.includes(item.id)); // Remove items by ID
    },

    toggleItemChecked: (state, action) => {
      const itemId = action.payload;
      const item = state.find((i) => i.id === itemId);
      if (item) item.checked = !item.checked;
    },

    toggleAllItemsChecked: (state, action) => {
      const isChecked = action.payload;
      state.forEach((item) => {
        item.checked = isChecked;
      });
    },


    clearCart: () => {
      return []; // Reset cart to empty
    },
  },
});

// Export actions
export const { addItem, removeItem, toggleItemChecked,toggleAllItemsChecked, clearCart } =
  updateCartSlice.actions;

// Export reducer
export default updateCartSlice.reducer;

// ✅ Selector to compute price details
export const selectPriceDetails = (state) => {
  const cartItems = state.updateCart;;
  const selectedItemQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const selectedItemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const selectedItemDeposit = cartItems.reduce((acc, item) => acc + (item.deposit || 0) * item.quantity, 0);
  const totalAmount = selectedItemPrice + selectedItemDeposit;

  return {
    selectedItemQuantity,
    selectedItemPrice,
    selectedItemDeposit,
    totalAmount,
  };
};
