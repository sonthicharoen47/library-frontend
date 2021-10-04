import React from "react";
import { useDispatch } from "react-redux";
import { booksSelected } from "./bookSlice";
import { useHistory } from "react-router-dom";

//css
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 200, maxheight: 250 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            {book.rating ? book.rating : 0}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => dispatch(booksSelected(book))}>
            Add
          </Button>
          <Button
            size="small"
            onClick={() =>
              history.push("dashboard/me", { bookId: book.id_book })
            }
          >
            More
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default BookCard;
