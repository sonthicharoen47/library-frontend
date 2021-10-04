import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSnackbarAlert } from "./snackbarAlertsSlice";

//css
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const { open, text, severity } = useSelector((state) => state.snackbarAlerts);
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearSnackbarAlert());
  };

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default SnackbarAlert;
