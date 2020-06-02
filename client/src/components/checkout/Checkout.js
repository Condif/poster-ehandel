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
} from "@material-ui/core";
import { UserContext } from "../../Contexts/UserContext";
import ProductCard from "../ProductCard/ProductCard";

//styles
import useStyles from "./CheckOutStyles";

const Checkout = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { userData, cartList } = useContext(UserContext);

  const { product } = props;

  const [shipmentAlternatives, setShipmentAlternatives] = useState([]);
  const [inputValues, setInputValues] = useState({
    choosenShipment: "DHL",
    phoneNr: "",
    // address: userData.deliveryAddress.address,
    // zipcode: userData.deliveryAddress.zipcode,
    // city: userData.deliveryAddress.city,
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
    history.push("/summery");
    console.log(inputValues, "här är värdena");
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

  function totalCost() {
    const totalCost = cartList.reduce((total, product) => {
      return total + product.cartAmount * product.price;
    }, 0);
    return totalCost;
  }

  function getShipmentCost() {
    const shipment = shipmentAlternatives.filter((currentShipment) => {
      console.log(currentShipment, "nuvarande skeppning");
      return currentShipment.alternative === inputValues.choosenShipment;
    });

    if (!shipmentAlternatives.length == 0) {
      return shipment[0].cost;
    }
  }

  return (
    <div className={classes.mainDiv}>
      <Container>
        {cartList.map((product) => (
          <ProductCard
            case="checkout"
            product={product}
            // handleChange={handleChange}
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
      {/* <FormControl className={classes.containerDiv}>
        <FormLabel className={classes.labelText}>Deliveryaddress</FormLabel>
        <TextField
          className={classes.containerDiv}
          variant="outlined"
          size="small"
          type="text"
          required
          label="Address"
          value={inputValues.address}
          onChange={(event) => handleChange(event, "address")}
        ></TextField>
        <TextField
          className={classes.containerDiv}
          variant="outlined"
          size="small"
          type="text"
          required
          label="Zipcode"
          value={inputValues.zipcode}
          onChange={(event) => handleChange(event, "zipcode")}
        ></TextField>
        <TextField
          className={classes.containerDiv}
          variant="outlined"
          size="small"
          type="text"
          required
          label="City"
          value={inputValues.city}
          onChange={(event) => handleChange(event, "city")}
        ></TextField>
      </FormControl> */}
      <Container className={classes.containerDiv}>
        {shipmentAlternatives.length > 0 && (
          <div style={{ width: "12rem" }}>
            <Typography variant="h6" paragraph>
              Total cost
            </Typography>
            <Typography>Varor: {totalCost()} SEK </Typography>
            <Typography>Varav moms {totalCost() * 0.25} SEK</Typography>
            <Typography className={classes.border}>
              Frakt: {getShipmentCost()} SEK
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
        disabled={
          !inputValues.choosenShipment ||
          !inputValues.phoneNr ||
          !inputValues.address ||
          !inputValues.zipcode ||
          !inputValues.city
        }
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
