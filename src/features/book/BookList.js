import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "./bookSlice";
//css import
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
    <Card className="cardBook" key={items.id_book}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {items.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
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
      <CssBaseline />
      <h2>Book!!!</h2>
      {booksList.length > 0 ? renderBook : <h1>{message}</h1>}
    </React.Fragment>
  );
};

export default BookList;
