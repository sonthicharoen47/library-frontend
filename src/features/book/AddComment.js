import React, { useState } from "react";
import { postComment, getAllComment } from "./bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

//css
import { Box, Typography, TextField, Button, Rating } from "@mui/material";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(amber[600]),
  backgroundColor: amber[600],
  "&:hover": {
    backgroundColor: amber[700],
  },
}));

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

    dispatch(postComment({ body, token })).then((result) => {
      let text = "";
      let severity = "info";
      if (result.payload.message) {
        text = result.payload.message;
        severity = "success";
      }
      if (result.payload.err) {
        text = result.payload.err;
        severity = "error";
      }
      dispatch(postSnackbarAlert({ text, severity }));
      dispatch(getAllComment({ body: { fk_book: bookId }, token }));
      setComment("");
      setRating(0);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Box
        component="fieldset"
        sx={{
          width: "60%",
          bgcolor: "background.paper",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="legend" sx={{ fontWeight: "bold" }}>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ColorButton sx={{ mx: 2, borderRadius: 2 }} onClick={handleSubmit}>
            Post Comment
          </ColorButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddComment;
