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
  selectedList: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    booksSelected(state, action) {
      let findDupObj = state.selectedList.find(
        (items) => items.id_book === action.payload.id_book
      );
      if (!findDupObj) {
        state.selectedList.push(action.payload);
      }
    },
    deletedSelected(state, action) {
      let x = state.selectedList.filter(
        (items) => items.id_book !== action.payload.id_book
      );
      state.selectedList = x;
    },
  },
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

export const { booksSelected, deletedSelected } = booksSlice.actions;
export default booksSlice.reducer;
