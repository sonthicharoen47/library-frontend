import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedSelected, postBorrowBook, clearSelected } from "./bookSlice";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

//css
import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
  Container,
  Box,
  TextField
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const BookSelected = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedList } = useSelector((state) => state.books);
  const { token } = useSelector((state) => state.accounts);
  const dateNow = new Date();
  const dateMax = new Date(moment().add(7, "days"));

  const [endDate, setEndDate] = useState("");

  const handleBorrow = () => {
    const body = {
      endDate: endDate,
      borrowBook: selectedList,
    };
    try {
      dispatch(postBorrowBook({ body, token })).then((result) => {
        let text = "";
        let severity = "info";
        if (result.payload.message) {
          text = result.payload.message;
          severity = "success";
          dispatch(postSnackbarAlert({ text, severity }));
          dispatch(clearSelected());
          history.push("/dashboard");
        }
        if (result.payload.err) {
          text = result.payload.err;
          severity = "error";
          dispatch(postSnackbarAlert({ text, severity }));
        }
      });
    } catch (err) {
      console.log(err);
    }
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
