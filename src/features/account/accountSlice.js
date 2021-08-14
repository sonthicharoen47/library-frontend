import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAccount } from "../../api/accountApi";

const initialState = {
  status: "idle",
  token: "",
  user: {},
  isLogged: false,
  error: null,
  message: "",
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
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },

  extraReducers: {
    [signupAccount.pending]: (state, action) => {
      state.status = "loading";
    },
    [signupAccount.fulfilled]: (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    },
    [signupAccount.rejected]: (state, action) => {
      state.status = "fail";
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

export const { logOut, updateStatus } = accountSlice.actions;
export default accountSlice.reducer;
