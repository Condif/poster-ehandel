import React, { useContext } from "react";
import { Drawer, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import CloseIcon from "@material-ui/icons/Close";
// STYLES
import useStyles from "./CartStyles";

const Cart = () => {
  const classes = useStyles();
  const history = useHistory();
  const { openCart, isCartOpen } = useContext(UserContext);

  function redirectToCheckOut() {
    history.push("/checkout");
  }
  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <Drawer
        style={{
          overflowX: "hidden",
        }}
        anchor="right"
        open={isCartOpen}
      >
        <div className={classes.headerWrapper}>
          <CloseIcon className={classes.closeIcon} onClick={openCart} />
          <Typography className={classes.header} variant="h4">
            Cart
          </Typography>
        </div>
        <div className={classes.listWrapper}></div>
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          onClick={() => redirectToCheckOut()}
        >
          To payment
        </Button>
      </Drawer>
    </div>
  );
};

export default Cart;
