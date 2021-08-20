import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook, booksSelected } from "./bookSlice";
import { useHistory, Redirect } from "react-router-dom";
import BookCard from "./BookCard";

//css import
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CssBaseline,
  Container,
  Box,
  Grid,
} from "@material-ui/core";

const BookList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { booksList, message } = useSelector((state) => state.books);
  const { isLogged, token } = useSelector((state) => state.accounts);

  if (isLogged === false) {
    console.log(isLogged);
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    dispatch(getAllBook(token));
  }, [dispatch]);

  const renderBook = booksList.map((items) => (
    <Card className="cardBook" key={items.id_book} sc={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={require("../../picture/harry_the_prison.jpeg")}
        title="img_1"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {items.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(booksSelected(items))}
        >
          Add
        </Button>
        <Button
          type="button"
          onClick={() => history.push("book/get/me", { bookId: items.id_book })}
        >
          more
        </Button>
      </CardActions>
    </Card>
  ));

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
