import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "./bookSlice";
import { Redirect } from "react-router-dom";
import BookCard from "./BookCard";

//css import
import { CssBaseline, Container, Grid } from "@material-ui/core";

const BookList = () => {
  const dispatch = useDispatch();
  const { booksList } = useSelector((state) => state.books);
  const { isLogged, token } = useSelector((state) => state.accounts);

  if (isLogged === false) {
    console.log(isLogged);
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    dispatch(getAllBook(token));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Container>
        <CssBaseline /> <h2>Book!!!</h2>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/* {booksList.length > 0 ? renderBook : <h1>{message}</h1>} */}
          {booksList.map((book) => (
            <Grid item key={book.id_book} xs={2} sm={4} md={4}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default BookList;
