import React from "react";
import { useHistory } from "react-router-dom";
//css
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
const ListCard = ({ order }) => {
  const history = useHistory();

  return (
    <div>
      <Card sx={{ maxWidth: 250, maxheight: 300 }}>
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
          <CardActions></CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ListCard;
