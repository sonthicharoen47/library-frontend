import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../../api/bookApi";

export const getAllBook = createAsyncThunk("getAllBook", async () => {
  const res = await getApi("/book/findAll");
  return res;
});

const initialState = {
  bookList: [],
  loading: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBook.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBook.fulfilled]: (state, { payload }) => {
      state.bookList = payload;
      state.loading = false;
    },
  },
});

// export const {} = bookSlice.actions;
export default bookSlice.reducer;
