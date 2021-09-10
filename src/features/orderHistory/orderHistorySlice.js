import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWithTokenApi } from "../../api/publicApi";

export const getOrderHistory = createAsyncThunk(
  "getOrderHistory",
  async (params) => {
    const res = await getWithTokenApi("/borrowDetail/findAll/me", params);
    return res;
  }
);

const initialState = {
  orderHistories: [],
  status: "idle",
};

const orderHistorysSlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrderHistory.fulfilled]: (state, action) => {
      state.orderHistories = action.payload;
      state.status = "success";
    },
    [getOrderHistory.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});

export const {} = orderHistorysSlice.actions;
export default orderHistorysSlice.reducer;
