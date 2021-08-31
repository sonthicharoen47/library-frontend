import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedSelected, postRentBook, clearSelected } from "./bookSlice";
import { useHistory } from "react-router-dom";
//css
import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
  TextField,
  Container,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/core/Alert";
import Slide from "@material-ui/core/Slide";

import { LocalizationProvider, DatePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import addWeeks from "date-fns/addWeeks";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const getWeeksAfter = (date, amount) => {
  return date ? addWeeks(date, amount) : undefined;
};

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
  const handleRent = () => {
    const body = {
      endDate: endDate,
      bookRent: selectedList,
    };
    try {
      dispatch(postRentBook({ body, token }));
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
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disablePast
            label="end date of rent"
            openTo="year"
            views={["year", "month", "day"]}
            value={endDate}
            maxDate={getWeeksAfter(new Date(), 2)}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button size="medium" onClick={handleRent}>
          Rent
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default BookSelected;
