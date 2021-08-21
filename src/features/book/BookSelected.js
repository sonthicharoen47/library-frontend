import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedSelected } from "./bookSlice";
//css
import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
} from "@material-ui/core";
const BookSelected = () => {
  const dispatch = useDispatch();
  const { selectedList } = useSelector((state) => state.books);

  const renderedSelected = selectedList.map((items) => (
    <Card key={items.id_book}>
      <CardContent>
        <Typography>{items.title}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(deletedSelected(items))}>
          Deleted
        </Button>
      </CardActions>
    </Card>
  ));
  return (
    <React.Fragment>
      <h1>Book Selected!!!!</h1>
      {selectedList.length > 0 ? renderedSelected : <h1>empty book</h1>}
    </React.Fragment>
  );
};

export default BookSelected;
