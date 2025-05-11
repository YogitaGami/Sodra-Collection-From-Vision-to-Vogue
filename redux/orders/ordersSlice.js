import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
