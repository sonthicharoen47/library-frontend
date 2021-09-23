import React from "react";
import pagenotfound from "./picture/404.svg";

//css
import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="404 page not found"
        src={pagenotfound}
      />
      <Typography variant="h1">404 PAGE NOT FOUND</Typography>
    </React.Fragment>
  );
};

export default PageNotFound;
