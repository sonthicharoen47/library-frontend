import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWithTokenApi,
  postWithTokenApi,
  putWithTokenApi,
} from "../../api/publicApi";

export const getAllAuthor = createAsyncThunk("getAllAutor", async (params) => {
  const res = getWithTokenApi("/author/findAll", params);
  return res;
});

export const getAllCategory = createAsyncThunk(
  "getAllCategory",
  async (params) => {
    const res = getWithTokenApi("/category/findAll", params);
    return res;
  }
);

export const postAddBook = createAsyncThunk("postAddBook", async (params) => {
  const res = postWithTokenApi("/book/addBook", params);
  return res;
});

export const postAddAuthor = createAsyncThunk(
  "postAddAuthor",
  async (params) => {
    const res = postWithTokenApi("/author/addAuthor", params);
    return res;
  }
);

export const postAddCategory = createAsyncThunk(
  "postAddCategory",
  async (params) => {
    const res = postWithTokenApi("/category/addCategory", params);
    return res;
  }
);

export const getAllBorrow = createAsyncThunk("getAllBorrow", async (params) => {
  const res = getWithTokenApi("/borrow/find/ordering", params);
  return res;
});

export const updateBorrowStatus = createAsyncThunk(
  "updateBorrowStatus",
  async (params) => {
    const res = putWithTokenApi("/borrow/update", params);
    return res;
  }
);

const initialState = {
  authorList: [],
  status: "idle",
  message: "",
  err: null,
  categoryList: [],
  borrowList: [],
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    updateAdminStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [getAllAuthor.fulfilled]: (state, action) => {
      state.authorList = action.payload;
      state.status = "success";
    },
    [getAllAuthor.rejected]: (state, action) => {
      state.status = "fail";
      state.err = "backend fail";
    },
    [getAllCategory.fulfilled]: (state, action) => {
      state.status = "success";
      state.categoryList = action.payload;
    },
    [getAllCategory.rejected]: (state, action) => {
      state.status = "fail";
      state.err = "backend fail";
    },
    [postAddBook.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.status = "success";
    },
    [postAddBook.rejected]: (state, action) => {
      state.status = "fail";
      state.err = "backend fail";
    },
    [postAddAuthor.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.status = "success";
    },
    [postAddAuthor.rejected]: (state, action) => {
      state.err = "backend fail";
      state.status = "fail";
    },
    [postAddCategory.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.status = "success";
    },
    [postAddCategory.rejected]: (state, action) => {
      state.status = "fail";
      state.err = "something wrong!";
    },
    [getAllBorrow.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllBorrow.fulfilled]: (state, action) => {
      state.borrowList = action.payload;
      state.status = "success";
    },
    [getAllBorrow.rejected]: (state, action) => {
      state.status = "fail";
      state.err = "backend wrong";
    },
    [updateBorrowStatus.fulfilled]: (state, action) => {
      state.status = "success";
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.err = action.payload.err;
      }
    },
    [updateBorrowStatus.rejected]: (state, action) => {
      state.status = "fail";
      state.err = "error";
    },
  },
});

export const { updateAdminStatus } = adminsSlice.actions;
export default adminsSlice.reducer;
