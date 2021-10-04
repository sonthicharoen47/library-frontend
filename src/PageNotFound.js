import React from "react";

//css
import { Box, Typography } from "@mui/material";

//pic
import pagenotfound from "./picture/404.svg";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        sx={{ width: "80vh", height: "60vh" }}
        alt="404 page not found"
        src={pagenotfound}
      />
      <Typography
        variant="h1"
        sx={{
          fontStyle: "italic",
          fontFamily: "Monospace",
          letterSpacing: 2,
          fontWeight: "medium",
          mt: 1,
          ml: 2,
        }}
      >
        404 PAGE NOT FOUND
      </Typography>
    </Box>
  );
};

export default PageNotFound;
