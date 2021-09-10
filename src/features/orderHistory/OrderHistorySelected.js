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

const OrderHistorySelected = () => {
  const location = useLocation();
  const orderHistory = location.state.orderHistory;

  return (
    <div>
      {orderHistory.map((items, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{items.start_date.slice(11, 16)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {items.BorrowDetails.map((element) => (
              <Typography key={element.Book.id_book}>
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
