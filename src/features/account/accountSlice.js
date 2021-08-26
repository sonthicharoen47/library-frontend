import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAccount } from "../../api/accountApi";

const initialState = {
  status: "idle",
  token: "",
  user: {},
  isLogged: false,
  err: null,
  message: "",
};

export const signupAccount = createAsyncThunk("signupaccount", async (body) => {
  console.log(body);
  const res = await registerAccount("/account/register", body);
  return res;
});

export const signinAccount = createAsyncThunk("signinaccount", async (body) => {
  const res = await registerAccount("/login", body);
  return res;
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.token = "";
      state.user = {};
      state.isLogged = false;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
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
  },
});

export const { logOut, updateStatus } = accountsSlice.actions;
export default accountsSlice.reducer;
