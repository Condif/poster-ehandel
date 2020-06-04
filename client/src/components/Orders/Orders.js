import React, { useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { UserContext } from "../../Contexts/UserContext";
import {Container} from "@material-ui/core";
import useStyles from "../Checkout/CheckOutStyles";

const Orders = () => {
  const classes = useStyles();
  const { cartList } = useContext(
    UserContext
  )
    return (
    <div className={classes.mainDiv}>
      <Container>
        {cartList.map((product) => (
          <ProductCard key={product._id} case="orders" product={product}></ProductCard>
        ))}
      </Container>
    </div>
    )
}

export default Orders