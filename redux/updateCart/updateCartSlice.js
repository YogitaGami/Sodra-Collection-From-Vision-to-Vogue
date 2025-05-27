import { createSlice } from "@reduxjs/toolkit";

// Define the reducer function
export const updateCartSlice = createSlice({
  name: "updateCart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: 1,
        checked: true,
      };
      const existingItemIndex = state.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.days === newItem.days &&
          item.deliveryDate === newItem.deliveryDate
      );

      if (existingItemIndex !== -1) {
        // Ensure we're not keeping any stale references to removed items
        state[existingItemIndex] = {
          ...state[existingItemIndex],
          ...newItem,
          quantity: 1,
        }; // Reset quantity to 1
      } else {
        state.push(newItem); // Add new item properly
      }
    },

    removeItemFromCart: (state, action) => {
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
export const {
  addItem,
  removeItemFromCart,
  toggleItemChecked,
  toggleAllItemsChecked,
  clearCart,
} = updateCartSlice.actions;

// Export reducer
export default updateCartSlice.reducer;

// ✅ Selector to compute price details
export const selectPriceDetails = (state) => {
  const cartItems = state.updateCart.filter((item) => item.checked);
  const selectedItemQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const selectedItemPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const selectedItemDeposit = cartItems.reduce(
    (acc, item) => acc + (item.deposit || 0) * item.quantity,
    0
  );
  const totalAmount = selectedItemPrice + selectedItemDeposit;

  return {
    selectedItemQuantity,
    selectedItemPrice,
    selectedItemDeposit,
    totalAmount,
  };
};
