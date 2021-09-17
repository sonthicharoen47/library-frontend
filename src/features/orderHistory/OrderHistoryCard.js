import React from "react";
import { useHistory } from "react-router-dom";
//css
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@material-ui/core";
const ListCard = ({ order }) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Card sx={{ maxWidth: "100%", maxheight: 250, m: 1 }}>
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
    </React.Fragment>
  );
};

export default ListCard;
