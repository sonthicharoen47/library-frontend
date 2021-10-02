import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { booksSelected, getAllComment, updateBookStatus } from "./bookSlice";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
//css
import { Box, Grid, Button, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(amber[600]),
  backgroundColor: amber[600],
  "&:hover": {
    backgroundColor: amber[700],
  },
}));

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

  return (
    <Box>
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
              width: "80vh",
              height: "60vh",
            }}
          >
            <Box
              sx={{ width: "100%", height: "100%" }}
              component="img"
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
                bgcolor: "grey.300",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  m: 1,
                  color: "#304ffe",
                }}
              >
                {book.title}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1,
                pl: 8,
                justifyContent: "flex-start",
                display: "flex",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="body1">{book.description}</Typography>
            </Box>
            <Box
              sx={{
                p: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                display: "flex",
              }}
            >
              <ColorButton
                sx={{ mx: 2, borderRadius: 2 }}
                onClick={() => dispatch(booksSelected(book))}
              >
                Add
              </ColorButton>
              <ColorButton
                sx={{ mx: 2, borderRadius: 2 }}
                onClick={() => history.goBack()}
              >
                Back
              </ColorButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddComment bookId={book.id_book} />
      <Box sx={{ mt: 2, mx: 10 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", my: 1 }}>
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
            <Typography variant="h6" sx={{ my: 1, mx: 6 }}>
              No Comment
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
export default SingleBookPage;
