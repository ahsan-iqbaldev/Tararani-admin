import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getsingleOrder } from "./ordersThunk";

const initialState = {
  orders: [],
  singleOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getsingleOrder.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getsingleOrder.fulfilled, (state, action) => {
        console.log("Completed");
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getsingleOrder.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { fetchOrders, fetchOrdersLoader } = ordersSlice.actions;
export default ordersSlice.reducer;
