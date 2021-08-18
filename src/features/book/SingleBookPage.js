import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
//css
import { Container, Box, CssBaseline, Grid, Button } from "@material-ui/core";

const SingleBookPage = () => {
  const location = useLocation();
  const bookId = location.state.bookId;
  const history = useHistory();

  const book = useSelector((state) =>
    state.books.booksList.find((items) => items.id_book === bookId)
  );

  if (!book) {
    return (
      <section>
        <h1>Book is missing!</h1>
      </section>
    );
  }

  //find author and category

  return (
    <Container>
      <CssBaseline />
      <Box sx={{ width: "100%", height: 500 }}>
        <Grid container spacing={2} justifyContent="center" item xs={12}>
          <Grid item xs={6}>
            <img
              src={require("../../picture/harry_the_prison.jpeg")}
              width="90%"
              height="75%"
              alt="img1"
            />
          </Grid>
          <Grid item xs={6}>
            <h1>{book.title}</h1>
            <h3>{book.description}</h3>
          </Grid>
        </Grid>
        <Button type="button">Add</Button>
        <Button type="button" onClick={() => history.goBack()}>
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default SingleBookPage;
