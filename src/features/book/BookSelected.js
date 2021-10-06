import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletedSelected, postBorrowBook, clearSelected } from "./bookSlice";
import { useHistory } from "react-router-dom";
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
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

//pic
import SvgEmpty from "../../picture/undraw_No_data_re_kwbl.svg";

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

  return (
    <React.Fragment>
      <Container sx={{ minHeight: "100vh" }}>
        <Typography
          variant="h2"
          sx={{
            fontStyle: "italic",
            fontFamily: "fantasy",
            letterSpacing: 3,
            color: "#fb8c00",
            fontWeight: "medium",
            mt: 2,
            flexGrow: 1,
          }}
        >
          Book Selected
        </Typography>
        {selectedList.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedList.map((items) => (
              <Card
                key={items.id_book}
                sx={{
                  width: "100vh",
                  display: "flex",
                  my: 1,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div">
                    {items.title}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", mx: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => dispatch(deletedSelected(items))}
                  >
                    Deleted
                  </Button>
                </CardActions>
              </Card>
            ))}
            <Box sx={{ m: 1, display: "flex", alignItems: "center", mt: 2 }}>
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
              <Button
                size="medium"
                variant="contained"
                color="success"
                onClick={handleBorrow}
                sx={{ mx: 1 }}
              >
                Borrow
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mt: 6,
                height: "50vh",
              }}
              component="img"
              src={SvgEmpty}
              alt="empthy selected"
            />
            <Typography
              variant="h3"
              sx={{
                fontStyle: "italic",
                fontFamily: "Monospace",
                letterSpacing: 2,
                color: "#673ab7",
                fontWeight: "medium",
                mt: 1,
              }}
            >
              Empthy Selected Books
            </Typography>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
};

export default BookSelected;
