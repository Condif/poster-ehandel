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
  // const { orderPlaced } = useContext(CheckoutContext)

  function getShipmentAlternatives() {
    fetch("http://localhost:8080/api/shipments", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((shipmentAlternatives) => {
        setShipmentAlternatives(shipmentAlternatives);
      });
  }

  useEffect(() => {
    getShipmentAlternatives();
    // eslint-disable-next-line
  }, []);

  return (
    <FormControl style={{ padding: "1rem" }}>
      <FormLabel className={classes.labelText}>Shipping Alternatives</FormLabel>
      <RadioGroup
        aria-label="ShippingAlternative"
        name="shipping1"
        value={validationInputs.choosenShipment.value}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        onChange={(event) => handleInputChange(event, "choosenShipment")}
      >
        {shipmentAlternatives.map((shipment) => (
          <div key={shipment._id} className={classes.containerDiv}>
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
