import React, { useContext } from "react";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import { UserContext } from "../../Contexts/UserContext";
import { Typography, Container } from "@material-ui/core";

import useStyles from "./TotalCostStyles";

const TotalCost = () => {
  const classes = useStyles();

  const { totalCost, amountOfItems } = useContext(UserContext);
  const { shipmentAlternatives, getShipmentCost } = useContext(CheckoutContext);

  return (
    <Container className={classes.containerDiv}>
      {shipmentAlternatives.length > 0 && (
        <div style={{ width: "12rem" }}>
          <Typography variant="h6" paragraph>
            Total cost
          </Typography>
          <Typography>Items: {amountOfItems()}</Typography>
          <Typography>Products: {totalCost()} SEK </Typography>
          <Typography>VAT {totalCost() * 0.2} SEK</Typography>
          <Typography className={classes.border}>
            Shipment: {getShipmentCost()} SEK
          </Typography>
          <Typography className={classes.text}>
            Totalkostnad {totalCost() + getShipmentCost()} SEK
          </Typography>
        </div>
      )}
    </Container>
  );
};
export default TotalCost;
