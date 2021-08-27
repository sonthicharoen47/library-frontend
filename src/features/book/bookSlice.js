import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../../api/bookApi";
import { postRentApi } from "../../api/rentApi";

export const getAllBook = createAsyncThunk("getAllBook", async (token) => {
  const res = await getApi("/book/findAll", token);
  return res;
});

export const postRentBook = createAsyncThunk("postRentBook", async (params) => {
  const res = await postRentApi("/rentDetail/add", params);
  return res;
});

const initialState = {
  booksList: [],
  message: "",
  selectedList: [],
  status: "idle",
  err: null,
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
    updateBookStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [getAllBook.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllBook.fulfilled]: (state, action) => {
      state.booksList = action.payload;
      state.status = "success";
    },
    [getAllBook.rejected]: (state, action) => {
      state.message = "can not fetch data!";
      state.status = "fail";
    },
    [postRentBook.pending]: (state, action) => {
      state.status = "loading";
    },
    [postRentBook.fulfilled]: (state, action) => {
      if (!action.payload.err) {
        state.message = action.payload.message;
        state.status = "success";
      } else {
        state.err = action.payload.err;
        state.status = "fail";
      }
    },
    [postRentBook.rejected]: (state, action) => {
      state.err = action.payload.err;
      state.status = "fail";
    },
  },
});

export const { booksSelected, deletedSelected, updateBookStatus } =
  booksSlice.actions;
export default booksSlice.reducer;
