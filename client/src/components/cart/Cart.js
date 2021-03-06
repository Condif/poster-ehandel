import React, { useContext } from "react";
import { Drawer, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../Contexts/UserContext";
import CloseIcon from "@material-ui/icons/Close";
import ProductCard from "../ProductCard/ProductCard";
import DeleteIcon from "@material-ui/icons/Delete";

// STYLES
import useStyles from "./CartStyles";

const Cart = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    openCart,
    isCartOpen,
    cartList,
    clearCartAndLocalStorage,
    totalCost,
    userData,
    setUser,
    setLoginPopup
  } = useContext(UserContext);

  const { createSlug } = props;
  function redirectToCheckOut() {
    if (cartList !== undefined || cartList !== undefined) {
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
          setLoginPopup({ showLogin: true, type: "info", message: "Please login before making a purchase." })
          return;
        }
        openCart();
        history.push("/checkout");
      });
    }
  }

  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <Drawer
        variant="temporary"
        style={{
          overflowX: "hidden",
        }}
        anchor="right"
        onClose={openCart}
        open={isCartOpen}
        ModalProps={{ disableEnforceFocus: true }}
      >
        <div className={classes.headerWrapper}>
          <CloseIcon className={classes.closeIcon} onClick={openCart} />
          <Typography className={classes.header} variant="h4">
            Cart
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={clearCartAndLocalStorage}
          >
            <DeleteIcon fontSize="small" />
            Cart
          </Button>
        </div>
        <div className={classes.listWrapper}>
          {cartList !== null &&
            cartList !== undefined &&
            cartList.length !== 0 ?
            <>
              <Grid item>
                {cartList !== null &&
                  cartList !== undefined &&
                  renderProducts(cartList, createSlug)}
              </Grid>
              <Grid item>
                <Typography className={classes.totalCostText}>
                  Total cost excluding shipment: {totalCost()} SEK
            </Typography>
                {cartList !== null && cartList !== undefined && (
                  <Typography className={classes.totalCostText}>
                    VAT: {(totalCost() * 0.2).toFixed(2)} SEK
                  </Typography>
                )}
              </Grid>
            </>
            : <Typography className={classes.emptyText} align="center">Your cart is empty.</Typography>}
        </div>
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

const renderProducts = (cartList, createSlug) => {
  return cartList.map((product) => {
    const slug = createSlug(product.name);
    return (
      <ProductCard
        case="cart"
        key={product._id}
        product={product}
        path={`/product/${slug}`}
      />
    );
  });
};

export default Cart;
