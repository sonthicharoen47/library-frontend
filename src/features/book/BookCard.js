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
} from "@material-ui/core";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <Card sx={{ maxWidth: 250, maxheight: 300 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {book.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => dispatch(booksSelected(book))}>
            Add
          </Button>
          <Button
            size="small"
            onClick={() => history.push("dashboard/me", { bookId: book.id_book })}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default BookCard;
