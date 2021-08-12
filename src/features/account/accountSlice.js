import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAccount } from "../../api/accountApi";

const initialState = {
  loading: false,
  message: "",
  token: "",
  user: {},
  isLogged: false,
};

export const signupAccount = createAsyncThunk("signupaccount", async (body) => {
  const res = await registerAccount("/account/register", body);
  return res;
});

export const signinAccount = createAsyncThunk("signinaccount", async (body) => {
  const res = await registerAccount("/login", body);
  return res;
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.token = "";
      state.user = {};
      state.isLogged = false;
    },
  },

  extraReducers: {
    [signupAccount.pending]: (state, action) => {
      state.loading = true;
    },
    [signupAccount.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.message) {
        state.message = action.payload.message;
      }
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
  },
});

export const { logOut } = accountSlice.actions;
export default accountSlice.reducer;
