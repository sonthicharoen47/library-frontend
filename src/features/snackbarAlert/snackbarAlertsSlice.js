import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  text: "",
  severity: "info",
};

const snackbarAlertsSlice = createSlice({
  name: "snackbarAlerts",
  initialState,
  reducers: {
    postSnackbarAlert(state, action) {
      console.log(action);
      state.open = true;
      state.text = action.payload.text;
      state.severity = action.payload.severity;
    },
    clearSnackbarAlert(state, action) {
      state.open = false;
      state.text = "";
      state.severity = "info";
    },
  },
});

export const { postSnackbarAlert, clearSnackbarAlert } =
  snackbarAlertsSlice.actions;
export default snackbarAlertsSlice.reducer;
