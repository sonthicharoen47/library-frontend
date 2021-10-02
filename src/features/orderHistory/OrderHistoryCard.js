import React from "react";
import { useHistory } from "react-router-dom";
//css
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
const ListCard = ({ order }) => {
  const history = useHistory();

  return (
    <Box>
      <Card sx={{ maxWidth: "100vh", maxheight: 250, mx: 8, mt: 2 }}>
        <CardActionArea
          onClick={() =>
            history.push("/orderhistory/date", { orderHistory: order.rentArr })
          }
        >
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {order.date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ListCard;
