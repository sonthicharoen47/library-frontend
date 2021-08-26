import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedSelected, postRentBook } from "./bookSlice";
//css
import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
  TextField,
  Container,
} from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import addWeeks from "date-fns/addWeeks";

const getWeeksAfter = (date, amount) => {
  return date ? addWeeks(date, amount) : undefined;
};

const BookSelected = () => {
  const dispatch = useDispatch();
  const { selectedList } = useSelector((state) => state.books);
  const { token } = useSelector((state) => state.accounts);

  const [endDate, setEndDate] = useState(new Date());
  //create a datepicker to choose end date for rent books.
  const handleRent = () => {
    const body = {
      end_date: "2022-07-05",
      bookRent: selectedList,
    };
    dispatch(postRentBook({ body, token }));
  };

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
      <Container>
        <h1>Book Selected!!!!</h1>
        {selectedList.length > 0 ? renderedSelected : <h1>empty book</h1>}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disablePast
            label="end date of rent"
            openTo="year"
            views={["year", "month", "day"]}
            value={endDate}
            maxDate={getWeeksAfter(new Date(), 2)}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button size="medium" onClick={handleRent}>
          Rent
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default BookSelected;
