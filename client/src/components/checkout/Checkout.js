import React, { useState, useEffect, useContext } from "react";
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
  Grid,
} from "@material-ui/core";
import { UserContext } from "../../Contexts/UserContext";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import ProductCard from "../ProductCard/ProductCard";
import ErrorIcon from "@material-ui/icons/Error";

//styles
import useStyles from "./CheckOutStyles";

const Checkout = () => {
  const classes = useStyles();
  const history = useHistory();
  const { cartList, totalCost, amountOfItems } = useContext(
    UserContext,
  );

  const { validationInputs, validateInputFields, checkErrorsInInfo, setInputToState, validateInputs } = useContext(
    CheckoutContext
  )


  const [shipmentAlternatives, setShipmentAlternatives] = useState([]);
  const [inputValues, setInputValues] = useState({
    choosenShipment: "DHL",
  });

  useEffect(() => {
    getShipmentAlternatives();
    // totalCost();
  }, []);

  function handleChange(event, anchor) {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
    });
  }

  const redirectToSummery = () => {
    const validated = validateInputFields()
    if (validated) {
      history.push("/summery");
    }
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

  function getShipmentCost() {
    const shipment = shipmentAlternatives.filter((currentShipment) => {
      return currentShipment.alternative === inputValues.choosenShipment;
    });

    if (!shipmentAlternatives.length == 0) {
      return shipment[0].cost;
    }
  }

  const handleInputChange = (event, id) => {

    if (
      id === 'city'
    ) {
      if (validateInputs(event.target.value, true)) {
        setInputToState(event.target.value, id, true);
      } else {
        setInputToState(event.target.value, id, false);
      }
    } else if (
      id === 'zipcode' ||
      id === 'phoneNr'
    )
      if (validateInputs(event.target.value, false)) {
        setInputToState(event.target.value, id, true);
      } else {
        setInputToState(event.target.value, id, false);
      }
    else {
      setInputToState(event.target.value, id, true)
    }
  }

  return (
    <div className={classes.mainDiv}>
      <Container>
        {cartList.map((product) => (
          <ProductCard
            case="checkout"
            product={product}
          ></ProductCard>
        ))}
      </Container>
      <FormControl>
        <FormLabel className={classes.labelText}>
          Shipping Alternatives
        </FormLabel>
        <RadioGroup
          className={classes.containerDiv}
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
      <FormControl className={classes.containerDiv}>
        <FormLabel className={classes.labelText}>Deliveryaddress</FormLabel>
        <TextField
          className={classes.containerDiv}
          error={validationInputs.address.error}
          variant="outlined"
          size="small"
          type="text"
          required
          label="Address"
          inputProps={{
            maxLength: 20,
          }}
          value={inputValues.address}
          onChange={(event) => handleInputChange(event, "address")}
        ></TextField>
        <TextField
          className={classes.containerDiv}
          error={validationInputs.zipcode.error}
          variant="outlined"
          size="small"
          inputProps={{
            maxLength: 5,
          }}
          type="text"
          helperText={validationInputs.phoneNr.error ? "Enter 5 numbers" : null}
          required
          label="Zipcode"
          value={inputValues.zipcode}
          onChange={(event) => handleInputChange(event, "zipcode")}
        ></TextField>
        <TextField
          className={classes.containerDiv}
          error={validationInputs.city.error}
          variant="outlined"
          size="small"
          type="text"
          inputProps={{
            maxLength: 20,
          }}
          helperText={validationInputs.phoneNr.error ? "Enter letters" : null}
          required
          label="City"
          value={inputValues.city}
          onChange={(event) => handleInputChange(event, "city")}
        ></TextField>
      </FormControl>
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
      <Container>
        <FormControl className={classes.containerDiv}>
          <FormLabel className={classes.labelText}>Swish</FormLabel>
          <TextField
            variant="outlined"
            error={validationInputs.phoneNr.error}
            size="small"
            type="tel"
            inputProps={{
              maxLength: 10,
            }}
            helperText={validationInputs.phoneNr.error ? "Enter a valid phone number" : null}
            required
            label="Phone number"
            value={inputValues.phoneNr}
            onChange={(event) => handleInputChange(event, "phoneNr")}
          ></TextField>
        </FormControl>
      </Container>
      <Grid item xs={12}>
        {checkErrorsInInfo() ? (
          <div className={classes.errorMsg}>
            <ErrorIcon fontSize="small" />
            <Typography variant="body2" align="center">
              Error in "Your Information"
                  </Typography>
          </div>
        ) : null}
      </Grid>
      <Button
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
