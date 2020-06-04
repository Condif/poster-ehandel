import React, { useEffect, useContext } from "react";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@material-ui/core";

import useStyles from "./ShipmentAlternativesStyle";

const ShipmentAlternatives = () => {
  const classes = useStyles();

  const {
    setShipmentAlternatives,
    validationInputs,
    shipmentAlternatives,
    handleInputChange,
  } = useContext(CheckoutContext);

  useEffect(() => {
    getShipmentAlternatives();
  }, []);

  function getShipmentAlternatives() {
    fetch("http://localhost:8080/api/shipments", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((shipmentAlternatives) => {
        setShipmentAlternatives(shipmentAlternatives);
      });
  }

  return (
    <FormControl>
      <FormLabel className={classes.labelText}>Shipping Alternatives</FormLabel>
      <RadioGroup
        className={classes.containerDiv}
        aria-label="ShippingAlternative"
        name="shipping1"
        value={validationInputs.choosenShipment.value}
        onChange={(event) => handleInputChange(event, "choosenShipment")}
      >
        {shipmentAlternatives.map((shipment, index) => (
          <div key={index} className={classes.containerDiv}>
            <FormControlLabel
              value={shipment.alternative}
              control={<Radio />}
              label={shipment.alternative}
            />
            <Typography>Price: {shipment.cost} kr</Typography>
            <Typography>Deliverytime: {shipment.deliveryTime} days</Typography>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ShipmentAlternatives;
