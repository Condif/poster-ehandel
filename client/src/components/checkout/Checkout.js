import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { UserContext } from "../../Contexts/UserContext";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import ProductCard from "../ProductCard/ProductCard";
import ShipmentAlternatives from "../ShipmentAlternatives/ShipmentAlternatives";
import ErrorIcon from "@material-ui/icons/Error";
import PaymentInformation from "./PaymentInformation";
import TotalCost from "../TotalCost/TotalCost";
import { renderProducts } from "../ProductGrid";

//styles
import useStyles from "./CheckOutStyles";

const Checkout = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    cartList,
    userData,
    setUser,
    handleReceipt,
    clearCartAndLocalStorage,
    totalCost,
    setLoginPopup,
    setOrderPlaced,
  } = useContext(UserContext);

  const {
    validateInputFields,
    checkErrorsInInfo,
    validationInputs,
    shipmentAlternatives,
  } = useContext(CheckoutContext);

  //updates inventory of each product when a purches is made
  const updateInventory = () => {
    fetch("http://localhost:8080/api/products/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(cartList),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Product inventory updated.");
      });
  };

  const redirectToReceipt = () => {
    const validated = validateInputFields();
    if (validated) {
      fetch("http://localhost:8080/sessions/checkLoginSession", {
        method: "GET",
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json();
        if (data.error) {
          // Reset user data when session has ended
          setLoginPopup({
            showLogin: true,
            message: "Please login before making a purchase.",
          });
          if (userData !== "") {
            setUser("");
          }
          return;
        }
        if (userData.id !== data.id) {
          setUser(data);
        }
        updateInventory();

        const receipt = await createNewOrder();

        clearCartAndLocalStorage();
        setOrderPlaced(Date.now());
        handleReceipt(receipt);
        history.push("/receipt");
      });
    }
  };

  const createNewOrder = async () => {
    const newShipment = shipmentAlternatives.filter((currentShipment) => {
      return (
        currentShipment.alternative === validationInputs.choosenShipment.value
      );
    });

    let newOrder = {
      products: cartList,
      shipment: {
        alternative: newShipment[0].alternative,
        cost: newShipment[0].cost,
        deliveryTime: newShipment[0].deliveryTime,
      },
      totalPrice: totalCost(),
      deliveryAddress: {
        address: validationInputs.address.value,
        zipcode: validationInputs.zipcode.value,
        city: validationInputs.city.value,
      },
    };

    const receipt = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newOrder),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return receipt;
  };

  return (
    <div className={classes.mainDiv}>
      <Grid container spacing={2} alignItems="stretch">
        {cartList !== null &&
          renderProducts("checkout", cartList, props.createSlug)}
      </Grid>
      {cartList !== undefined && cartList.length === 0 && (
        <Container className={classes.goBackDiv}>
          <Typography className={classes.text}>
            Your cart is empty. Go back and add items.
          </Typography>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            onClick={() => history.push("/")}
          >
            Add items
          </Button>
        </Container>
      )}
      <ShipmentAlternatives />
      <PaymentInformation />
      <TotalCost />
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
        disabled={cartList !== undefined && cartList.length === 0}
        variant="contained"
        color="primary"
        onClick={redirectToReceipt}
      >
        Make purchase
      </Button>
    </div>
  );
};

export default Checkout;
