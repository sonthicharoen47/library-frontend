import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedSelected, postBorrowBook, clearSelected } from "./bookSlice";
import { useHistory } from "react-router-dom";
//css
import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
  Container,
  Snackbar,
  Box,
} from "@material-ui/core";
import MuiAlert from "@material-ui/core/Alert";
import Slide from "@material-ui/core/Slide";

import moment from "moment";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookSelected = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedList, status, message, err } = useSelector(
    (state) => state.books
  );
  const { token } = useSelector((state) => state.accounts);
  const [alert, setAlert] = useState({
    open: false,
    text: "",
    severity: "",
  });
  const dateNow = new Date();
  const dateMax = new Date(moment().add(7, "days"));

  useEffect(() => {
    if (status === "success") {
      setAlert({
        open: true,
        text: message,
        severity: "success",
      });
      setTimeout(() => {
        dispatch(clearSelected());
        history.push("/dashboard");
      }, 1000);
    } else if (status === "fail") {
      setAlert({
        open: true,
        text: err,
        severity: "error",
      });
    }
  }, [dispatch, status, err, history, message]);

  const [endDate, setEndDate] = useState("");
  //create a datepicker to choose end date for rent books.
  const handleBorrow = () => {
    const body = {
      endDate: endDate,
      borrowBook: selectedList,
    };
    try {
      dispatch(postBorrowBook({ body, token }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  const renderedSelected = selectedList.map((items) => (
    <Card key={items.id_book}>
      <CardContent>
        <Typography>{items.title}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(deletedSelected(items))}>
          Deleted
        </Button>
      </CardActions>
    </Card>
  ));
  return (
    <React.Fragment>
      <Container>
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.text}
          </Alert>
        </Snackbar>
        <h1>Book Selected!!!!</h1>
        {selectedList.length > 0 ? renderedSelected : <h1>empty book</h1>}
        <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Return book date"
              value={endDate}
              minDate={dateNow}
              maxDate={dateMax}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button size="medium" onClick={handleBorrow} sx={{ ml: 1 }}>
            Borrow
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BookSelected;
