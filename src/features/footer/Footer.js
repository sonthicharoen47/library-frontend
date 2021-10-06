import React from "react";

//css
import { AppBar, Typography, Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <AppBar
      position="relative"
      style={{
        borderTop: "1px solid #ddd",
      }}
      sx={{ bgcolor: "#212121" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() =>
            window.open("https://www.facebook.com/sonthicharoen47")
          }
        >
          <FacebookIcon sx={{ color: "white" }} fontSize="large" />
        </IconButton>

        <IconButton
          onClick={() => window.open("https://github.com/sonthicharoen47")}
        >
          <GitHubIcon sx={{ color: "white" }} fontSize="large" />
        </IconButton>

        <Typography variant="body1" color="inherit">
          © 2021 Kittikon
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Footer;
