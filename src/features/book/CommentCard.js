import React, { useEffect } from "react";
//css
import { Container, Box, Typography, Rating, Grid } from "@material-ui/core";
const CommentCard = ({ comment }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        m: 1,
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
      }}
    >
      <Rating
        name="read-only"
        value={comment.score}
        sx={{ pl: 2, mt: 1 }}
        readOnly
      />
      <Typography variant="body1" align="left" sx={{ pl: 2, mb: 1 }}>
        {comment.comment ? comment.comment : ""}
      </Typography>
      <Box sx={{ bgcolor: "#e3f2fd" }}>
        <Grid container direction="row">
          <Grid xs={6} item sx={{ bgcolor: "warning.main" }}>
            <Typography
              variant="body2"
              align="left"
              sx={{ color: "text.secondary", pl: 2 }}
            >{`${comment.fname} ${comment.lname}`}</Typography>
          </Grid>
          <Grid xs={6} item sx={{ bgcolor: "success.main" }}>
            <Typography
              variant="body2"
              align="right"
              sx={{ color: "text.secondary", pr: 2 }}
            >{`${comment.date} ${comment.time}`}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommentCard;
