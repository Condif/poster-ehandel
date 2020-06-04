import React, { useState, useEffect, useContext } from "react";
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
  const { cartList, totalCost, amountOfItems } = useContext(UserContext);

  // const {
  //   validationInputs,
  //   validateInputFields,
  //   checkErrorsInInfo,
  //   handleInputChange,
  // } = useContext(CheckoutContext);

  const {
    validationInputs,
    validateInputFields,
    checkErrorsInInfo,
    setInputToState,
    validateInputs,
  } = useContext(CheckoutContext);

  const redirectToSummery = () => {
    const validated = validateInputFields();
    if (validated) {
      history.push("/summery");
    }
  };

  return (
    <div className={classes.mainDiv}>
      <Container>
        {cartList.map((product) => (
          <ProductCard case="checkout" product={product}></ProductCard>
        ))}
      </Container>
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
        onClick={() => redirectToSummery()}
      >
        Make purchase
      </Button>
    </div>
  );
};

export default Checkout;
