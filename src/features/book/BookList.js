import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "./bookSlice";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";
import BookCard from "./BookCard";

//css import
import { Grid, Box, Typography } from "@mui/material";

//pic
import SvgWelcome from "../../picture/undraw_welcome_cats_thqn.svg";
import SvgEmpty from "../../picture/undraw_No_data_re_kwbl.svg";

const BookList = () => {
  const dispatch = useDispatch();
  const { booksList } = useSelector((state) => state.books);
  const { token } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(getAllBook({ token })).then((result) => {
      if (result.error) {
        let text = "Your Token has expired";
        let severity = "error";
        dispatch(postSnackbarAlert({ text, severity }));
      }
    });
  }, [dispatch, token]);

  if (booksList.length > 0) {
    return (
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        component="div"
      >
        <Box
          sx={{
            width: "100%",
            height: "20vh",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="img"
          src={SvgWelcome}
          alt="welcome to library online!"
        />
        <Grid container direction="row">
          {booksList.map((book) => (
            <Grid item key={book.id_book} xs={2} sm={2} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                style={{ minHeight: "200px" }}
              >
                <BookCard book={book} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else {
    return (
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
          alt="empthy books"
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
            ml: 2,
          }}
        >
          Empthy Book
        </Typography>
      </Box>
    );
  }
};

export default BookList;
