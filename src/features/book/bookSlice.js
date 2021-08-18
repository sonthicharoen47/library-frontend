import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../../api/bookApi";

export const getAllBook = createAsyncThunk("getAllBook", async (token) => {
  const res = await getApi("/book/findAll", token);
  return res;
});

const initialState = {
  booksList: [],
  loading: false,
  message: "",
  bookId: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBook.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBook.fulfilled]: (state, action) => {
      state.booksList = action.payload;
      state.loading = false;
    },
    [getAllBook.rejected]: (state, action) => {
      state.message = "can not fetch data!";
      state.loading = false;
    },
  },
});

// export const {} = bookSlice.actions;
export default booksSlice.reducer;
