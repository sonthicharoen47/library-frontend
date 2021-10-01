import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "./bookSlice";
import BookCard from "./BookCard";

//css import
import { Grid, Box } from "@mui/material";

const BookList = () => {
  const dispatch = useDispatch();
  const { booksList } = useSelector((state) => state.books);
  const { token } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(getAllBook({ token }));
  }, [dispatch, token]);

  console.log(booksList);

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
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
};

export default BookList;
