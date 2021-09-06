import React, { useState, useEffect } from "react";
import { postComment } from "./bookSlice";
import { useDispatch, useSelector } from "react-redux";
//css
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const AddComment = ({ bookId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { token } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const onCommentChanged = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    let body = {
      score: rating,
      fk_book: bookId,
      comment: comment || null,
    };
    dispatch(postComment({ body, token })).then(() => {
      setComment("");
      setRating(0);
    });
  };

  return (
    <Container>
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
