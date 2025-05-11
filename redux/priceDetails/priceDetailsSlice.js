// redux/priceDetailsSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  selectedItemQuantity: 0,
  selectedItemPrice: 0,
  selectedItemDeposit: 0,
};

const priceDetailsSlice = createSlice({
  name: "priceDetails",
  initialState,
  reducers: {
    updatePriceDetails: (state, action) => {
      state.selectedItemQuantity = action.payload.selectedItemQuantity;
      state.selectedItemPrice = action.payload.selectedItemPrice;
      state.selectedItemDeposit = action.payload.selectedItemDeposit;
    },
  },
});

// Selector to compute price details from cart state
export const selectPriceDetails = createSelector(
  [(state) => state.updateCart],
  (cartItems) => {
    const selectedItems = cartItems.filter((item) => item.checked);

    const selectedItemQuantity = selectedItems.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );

    const selectedItemPrice = selectedItems.reduce((total, item) => {
      let price = 0;

      if (typeof item.price === "number") {
        price = item.price;
      } else if (
        typeof item.price === "object" &&
        item.price !== null &&
        item.days in item.price
      ) {
        price = item.price[item.days];
      }

      return total + price;
    }, 0);

    const selectedItemDeposit = selectedItems.reduce(
      (total, item) => total + (item.deposit || 0),
      0
    );

    return {
      selectedItemQuantity,
      selectedItemPrice,
      selectedItemDeposit,
      totalAmount: selectedItemPrice + selectedItemDeposit + 10 + 80, // Example extra fees
    };
  }
);

export const { updatePriceDetails } = priceDetailsSlice.actions;
export default priceDetailsSlice.reducer;
