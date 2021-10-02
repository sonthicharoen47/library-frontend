import React from "react";
import { useLocation } from "react-router-dom";

//css

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

const OrderHistorySelected = () => {
  const location = useLocation();
  const orderHistory = location.state.orderHistory;

  const switchColor = (param) => {
    switch (param) {
      case "ordering":
        return <FiberManualRecordIcon color="secondary" />;
      case "borrowing":
        return <FiberManualRecordIcon color="success" />;
      case "return":
        return <FiberManualRecordIcon color="primary" />;
      default:
        return <FiberManualRecordIcon color="disable" />;
    }
  };

  return (
    <Box>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        {orderHistory.map((items, index) => (
          <Accordion key={index} sx={{ width: "100vh" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ flexGrow: 1 }}>
                Time: {items.start_date.slice(11, 16)}
              </Typography>
              {switchColor(items.status)}
              <Typography sx={{ mr: 3, ml: 1 }}>{items.status}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#e0e0e0" }}>
              {items.BorrowDetails.map((element) => (
                <Typography key={element.Book.id_book}>
                  {element.Book.title}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default OrderHistorySelected;
