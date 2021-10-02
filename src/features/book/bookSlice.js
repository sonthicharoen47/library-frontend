import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWithTokenApi, postWithTokenApi } from "../../api/publicApi";

export const getAllBook = createAsyncThunk("getAllBook", async (params) => {
  const res = await getWithTokenApi("/book/findAll", params);
  return res;
});

export const postBorrowBook = createAsyncThunk(
  "postBorrowBook",
  async (params) => {
    const res = await postWithTokenApi("/borrowDetail/add", params);
    return res;
  }
);

export const postBookApi = createAsyncThunk("postbookapi", async (params) => {
  const res = await postWithTokenApi("/book/get/me", params);
  return res;
});

export const getAllComment = createAsyncThunk(
  "getAllComment",
  async (params) => {
    const res = await postWithTokenApi("/rating/getComment", params);
    return res;
  }
);

export const postComment = createAsyncThunk("postComment", async (params) => {
  const res = await postWithTokenApi("/rating/comment", params);
  return res;
});

const initialState = {
  booksList: [],
  message: "",
  selectedList: [],
  status: "idle",
  err: null,
  commentList: [],
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
    clearSelected(state, action) {
      state.selectedList = [];
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
    [postBorrowBook.pending]: (state, action) => {
      state.status = "loading";
      state.message = "";
      state.err = null;
    },
    [postBorrowBook.fulfilled]: (state, action) => {
      if (!action.payload.err) {
        state.message = action.payload.message;
        state.status = "success";
      } else {
        state.err = action.payload.err;
        state.status = "fail";
      }
    },
    [postBorrowBook.rejected]: (state, action) => {
      state.err = action.payload.err;
      state.status = "fail";
    },
    [getAllComment.fulfilled]: (state, action) => {
      state.commentList = action.payload;
      state.status = "success";
    },
    [getAllComment.rejected]: (state, action) => {
      state.err = "can not fetch comment from server";
      state.status = "fail";
    },
    [postComment.pending]: (state, action) => {
      state.message = "";
      state.err = null;
    },
    [postComment.fulfilled]: (state, action) => {
      state.status = "success";
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.err = action.payload.err;
      }
    },
    [postComment.rejected]: (state, action) => {
      state.err = "can not comment :( ";
      state.status = "fail";
    },
  },
});

export const {
  booksSelected,
  deletedSelected,
  updateBookStatus,
  clearSelected,
} = booksSlice.actions;
export default booksSlice.reducer;
