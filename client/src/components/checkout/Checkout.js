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

//styles
import useStyles from "./CheckOutStyles";

const Checkout = () => {
  const classes = useStyles();
  const history = useHistory();
  const { cartList, userData, setUser, authenticateUser } = useContext(
    UserContext
  );

  const { validateInputFields, checkErrorsInInfo } = useContext(
    CheckoutContext
  );

  const updateInventory = () => {
    console.log("i update", cartList);
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
        alert("Product inventory updated.");
      });
  };

  const redirectToSummery = () => {
    const validated = validateInputFields();
    if (validated) {
      fetch("http://localhost:8080/sessions/checkLoginSession", {
        method: "GET",
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json();
        if (data.error) {
          // Reset user data when session has ended
          if (userData !== "") {
            setUser("");
          }
          alert(`You need to be a member to make a purchase.
          Would you like to sign up?`);
          return;
        }
        if (userData.id !== data.id) {
          setUser(data);
        }
        authenticateUser(data);
        history.push("/orders");
      });
    }
  };

  const nextStep = () => {
    redirectToSummery();
  };

  return (
    <div className={classes.mainDiv}>
      <Container>
        {cartList.map((product) => (
          <ProductCard
            key={product._id}
            case="checkout"
            product={product}
          ></ProductCard>
        ))}
      </Container>
      {cartList.length === 0 && (
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
        variant="contained"
        color="primary"
        onClick={() => updateInventory()}
      >
        Make purchase
      </Button>
    </div>
  );
};

export default Checkout;
