import React, { useEffect } from "react";
import { getOrderHistory } from "./orderHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import OrderHistoryCard from "./OrderHistoryCard";

const OrderHistoryList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { orderHistories } = useSelector((state) => state.orderHistorys);

  useEffect(() => {
    dispatch(getOrderHistory({ token }));
  }, [dispatch, token]);

  return (
    <React.Fragment>
      {orderHistories.map((items, index) => (
        <Grid item key={index}>
          <OrderHistoryCard order={items} />
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default OrderHistoryList;
