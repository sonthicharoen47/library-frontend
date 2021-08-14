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

const BookList = () => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);
  const { isLogged } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAllBook());
  }, [dispatch]);

  if (isLogged === false) {
    console.log(isLogged);
    return <Redirect to="/login" />;
  }
  // const renderBook = bookList.map((items, index) => console.log(items));
  const renderBook = bookList.map((items) => (
    // <article className="renderBook" key={items.id_book}>
    //   <h3>{items.title}</h3>
    // </article>
    <Card className="cardBook" key={items.id_book}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {items.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {items.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  ));

  // const renderBook = bookList.map((items, index) =>
  //   // (
  //   //   <article className="articlaer" key={index}>
  //   //     <h3>{items.title}</h3>
  //   //   </article>
  //   // )
  //   {
  //     console.log(index);
  //   }
  // );
  // if (Array.isArray(bookList)) {
  //   // console.log(bookList);
  //   const renderBook = bookList.map((items) => {
  //     <li>{items.title}</li>;
  //   });
  // }

  return (
    <React.Fragment>
      <CssBaseline />
      <h2>Book!!!</h2>
      {renderBook}
    </React.Fragment>
  );
};

export default BookList;
