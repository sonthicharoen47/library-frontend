import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { booksSelected, getAllComment, updateBookStatus } from "./bookSlice";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
//css
import { Box, Grid, Button, Typography } from "@material-ui/core";

const SingleBookPage = () => {
  const location = useLocation();
  const bookId = location.state.bookId;

  const history = useHistory();

  const dispatch = useDispatch();
  const book = useSelector((state) =>
    state.books.booksList.find((items) => items.id_book === bookId)
  );
  const { token } = useSelector((state) => state.accounts);

  useEffect(() => {
    let body = {
      fk_book: book.id_book,
    };
    dispatch(getAllComment({ body, token })).then(() => {
      dispatch(updateBookStatus("idle"));
    });
  }, [book.id_book, dispatch, token]);

  const { commentList } = useSelector((state) => state.books);

  if (!book) {
    return (
      <section>
        <h1>Book is missing!</h1>
      </section>
    );
  }

  return (
    <Box sx={{ bgcolor: "primary.main" }}>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6} align="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              bgcolor: "background.paper",
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow: 1,
              fontWeight: "bold",
              m: 2,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.paper",
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow: 1,
              fontWeight: "bold",
              m: 2,
            }}
          >
            <Box
              sx={{
                p: 1,
                bgcolor: "grey.300",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {book.title}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1,
                pl: 8,
                bgcolor: "success.main",
                justifyContent: "flex-start",
                display: "flex",
              }}
            >
              <Typography variant="body2">{book.description}</Typography>
            </Box>
            <Box
              sx={{
                p: 1,
                bgcolor: "warning.main",
                justifyContent: "center",
                alignItems: "flex-end",
                display: "flex",
              }}
            >
              <Button
                sx={{ mx: 2, border: 1, borderRadius: 4 }}
                onClick={() => dispatch(booksSelected(book))}
              >
                Add
              </Button>
              <Button
                sx={{ mx: 2, border: 1, borderRadius: 4 }}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddComment bookId={book.id_book} />
      <Box sx={{ mt: 2, alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", pl: 6 }}>
          CommentCardList
        </Typography>
        <Grid container>
          {commentList.length > 0 ? (
            commentList.map((items) => (
              <Grid item key={items.id_rating} xs={6}>
                <CommentCard comment={items} />
              </Grid>
            ))
          ) : (
            <h1>no comment</h1>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
export default SingleBookPage;
