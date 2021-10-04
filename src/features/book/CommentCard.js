import React from "react";

//css
import { Box, Typography, Rating, Grid } from "@mui/material";

const CommentCard = ({ comment }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mb: 2,
        mx: 1,
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
      <Box sx={{ bgcolor: "grey.200", py: 1 }}>
        <Grid container direction="row">
          <Grid xs={6} item>
            <Typography
              variant="body2"
              align="left"
              sx={{ color: "text.secondary", mx: 2 }}
            >{`${comment.fname} ${comment.lname}`}</Typography>
          </Grid>
          <Grid xs={6} item>
            <Typography
              variant="body2"
              align="right"
              sx={{ color: "text.secondary", mx: 2 }}
            >{`${comment.date} ${comment.time}`}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommentCard;
