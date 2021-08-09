import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAccount } from "../../api/accountApi";

const initialState = {
  loading: false,
  message: "",
};

export const signupAccount = createAsyncThunk("signupaccount", async (body) => {
  const res = await registerAccount("/account/register", body);
  console.log(res);
  return res;
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},

  extraReducers: {
    [signupAccount.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.message) {
        state.message = action.payload.message;
      }
    },
    [signupAccount.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
