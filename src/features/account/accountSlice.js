import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWithoutTokenApi,
  postWithoutTokenApi,
} from "../../api/publicApi";
const initialState = {
  status: "idle",
  token: "",
  user: null,
  err: null,
  message: "",
  isLogged: false,
};

export const signupAccount = createAsyncThunk(
  "signupaccount",
  async (params) => {
    const res = await postWithoutTokenApi("/register", params);
    return res;
  }
);

export const signinAccount = createAsyncThunk(
  "signinaccount",
  async (params) => {
    const res = await postWithoutTokenApi("/login", params);
    return res;
  }
);

export const signoutAccount = createAsyncThunk("signoutaccount", async () => {
  const res = await getWithoutTokenApi("/logout");
  return res;
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    updateAccountStatus: (state, action) => {
      state.status = action.payload;
    },
    logout: () => initialState,
  },

  extraReducers: {
    [signupAccount.pending]: (state, action) => {
      state.status = "loading";
    },
    [signupAccount.fulfilled]: (state, action) => {
      if (!action.payload.err) {
        state.status = "success";
        state.message = action.payload.message;
      } else {
        state.status = "fail";
        state.err = action.payload.err;
      }
    },
    [signupAccount.rejected]: (state, action) => {
      state.status = "fail";
      state.message = "something error at back-end";
    },
    [signinAccount.pending]: (state, action) => {
      state.loading = true;
    },
    [signinAccount.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.isLogged = true;
    },
    [signinAccount.rejected]: (state, action) => {
      state.isLogged = false;
      state.loading = false;
    },
    [signoutAccount.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.status = "success";
      state.isLogged = false;
    },
  },
});

export const { updateAccountStatus, logout } = accountsSlice.actions;
export default accountsSlice.reducer;
