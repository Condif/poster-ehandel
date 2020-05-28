import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

//styles
import useStyles from "./CheckOutStyles";

const Checkout = () => {
  const classes = useStyles();
  const history = useHistory();

  const [shipmentAlternatives, setShipmentAlternatives] = useState([]);
  const [inputValues, setInputValues] = useState({
    choosenShipment: "DHL",
    phoneNr: "",
  });

  useEffect(() => {
    getShipmentAlternatives();
  }, []);

  function handleChange(event, anchor) {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
    });
  }

  const redirectToSummery = () => {
    history.push("/summery");
  };

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
    <div>
      <Container>
        <Typography>HÄR KOMMER PRODUKTER LIGGA</Typography>
      </Container>
      <FormControl>
        <FormLabel className={classes.labelText}>
          Shipping Alternatives
        </FormLabel>
        <RadioGroup
          aria-label="ShippingAlternative"
          name="shipping1"
          value={inputValues.choosenShipment}
          onChange={(event) => handleChange(event, "choosenShipment")}
        >
          {shipmentAlternatives.map((shipment, index) => (
            <div key={index} className={classes.containerDiv}>
              <FormControlLabel
                value={shipment.alternative}
                control={<Radio />}
                label={shipment.alternative}
              />
              <Typography>Price: {shipment.cost} kr</Typography>
              <Typography>
                Deliverytime: {shipment.deliveryTime} days
              </Typography>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      <Container>
        <FormControl className={classes.containerDiv}>
          <FormLabel className={classes.labelText}>Swish</FormLabel>
          <TextField
            variant="outlined"
            size="small"
            type="tel"
            required
            label="Phone number"
            value={inputValues.phoneNr}
            onChange={(event) => handleChange(event, "phoneNr")}
          ></TextField>
        </FormControl>
      </Container>
      <Button
        disabled={!inputValues.choosenShipment || !inputValues.phoneNr}
        className={classes.submitButton}
        variant="contained"
        color="primary"
        onClick={() => redirectToSummery()}
      >
        Make purchase
      </Button>
    </div>
  );
};

export default Checkout;
