import React, {  useState, useEffect } from "react";
import {Container} from "@material-ui/core";
import useStyles from "../Checkout/CheckOutStyles";

const Orders = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState();
 
  
  const getAllOrders = async () => {
    const allOrders = await fetch("http://localhost:8080/api/orders", {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json())
    .then((data) => {
      return data
    })
  return allOrders
  };

  const setupOrders = async () => {
    const allOrders = await getAllOrders()
    setOrders(allOrders)
  }

  useEffect(() => {
    setupOrders()
  }, []);

    return (
    <div className={classes.mainDiv}>
      <Container>
        {orders != undefined ? (
          orders.map((order) => (
            console.log("see order", order)
          ))) : null}
      </Container>
    </div>
    )
}

export default Orders