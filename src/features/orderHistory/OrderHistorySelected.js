import React from "react";
import { useLocation } from "react-router-dom";

//css
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
    <div>
      {orderHistory.map((items, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography align="left" sx={{ width: "30%" }}>
              Time: {items.start_date.slice(11, 16)}
            </Typography>
            {switchColor(items.status)}
            <Typography>{items.status}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "#e0e0e0" }}>
            {items.BorrowDetails.map((element) => (
              <Typography key={element.Book.id_book} sx={{ mb: 1 }}>
                {element.Book.title}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default OrderHistorySelected;
