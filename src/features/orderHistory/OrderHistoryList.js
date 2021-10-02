import React, { useEffect } from "react";
import { getOrderHistory } from "./orderHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Box, Container } from "@mui/material";
import OrderHistoryCard from "./OrderHistoryCard";
import SvgEmpty from "../../picture/undraw_No_data_re_kwbl.svg";

const OrderHistoryList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { orderHistories } = useSelector((state) => state.orderHistorys);

  useEffect(() => {
    dispatch(getOrderHistory({ token }));
  }, [dispatch, token]);

  return (
    <React.Fragment>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontStyle: "italic",
              fontFamily: "fantasy",
              letterSpacing: 3,
              color: "#fb8c00",
              fontWeight: "medium",
              mt: 2,
              flexGrow: 1,
              mx: 2,
            }}
          >
            History
          </Typography>
          {orderHistories.length > 0 ? (
            orderHistories.map((items, index) => (
              <Grid item key={index}>
                <OrderHistoryCard order={items} />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  mt: 6,
                  height: "50vh",
                }}
                component="img"
                src={SvgEmpty}
                alt="empthy history"
              />
              <Typography
                variant="h3"
                sx={{
                  fontStyle: "italic",
                  fontFamily: "Monospace",
                  letterSpacing: 3,
                  color: "#673ab7",
                  fontWeight: "medium",
                  mt: 1,
                  ml: 2,
                }}
              >
                Empthy History
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default OrderHistoryList;
