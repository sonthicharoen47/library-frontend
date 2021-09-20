import React, { useState } from "react";
import { postComment, getAllComment } from "./bookSlice";
import { useDispatch, useSelector } from "react-redux";
//css
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import Rating from "@mui/material/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddComment = ({ bookId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { token } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    open: false,
    text: "",
    severity: "info",
  });

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({
      open: false,
      text: "",
      severity: "info",
    });
  };

  const onCommentChanged = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    let body = {
      score: rating,
      fk_book: bookId,
      comment: comment || null,
    };

    dispatch(postComment({ body, token })).then((result) => {
      if (result.payload.message) {
        setAlert({
          open: true,
          text: result.payload.message,
          severity: "success",
        });
      }
      if (result.payload.err) {
        setAlert({
          open: true,
          text: result.payload.err,
          severity: "error",
        });
      }
      dispatch(getAllComment({ body: { fk_book: bookId }, token }));
      setComment("");
      setRating(0);
    });
  };

  return (
    <Container>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alert.severity !== "" ? alert.severity : null}
          sx={{ width: "100%" }}
        >
          {alert.text}
        </Alert>
      </Snackbar>
      <Box component="fieldset" sx={{ bgcolor: "background.paper" }}>
        <Typography component="legend" sx={{ fontWeight: "bold" }}>
          Rating and Comment
        </Typography>
        <Rating
          name="size-large"
          size="large"
          defaultValue={0}
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          precision={0.5}
          max={5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
        <TextField
          fullWidth
          id="comment"
          label="Comment"
          name="comment"
          autoComplete="comment"
          value={comment}
          onChange={onCommentChanged}
          sx={{ mb: 1 }}
        />
        <Button sx={{ border: 1, borderRadius: 4 }} onClick={handleSubmit}>
          Post Comment
        </Button>
      </Box>
    </Container>
  );
};

export default AddComment;
