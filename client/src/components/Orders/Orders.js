import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Container } from "@material-ui/core";
import useStyles from "./OrdersStyles";

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
    <Grid container className={classes.mainDiv}>
      <Grid item xs={12}>
        <Typography variant="h3">Orders</Typography>
      </Grid>
      {orders != undefined ? (
        orders.map((order) => (
          <Grid container className={classes.orderContainer}>
            <Paper className={classes.paper}style={{ width: " 100%" }}>
              <Grid item xs={12} className={classes.information}>
                <Typography variant="h4">Order: {order._id} </Typography>
              </Grid>
              <Grid container className={classes.orderItems}>
                <Grid item xs={4} className={classes.information}>
                  <Typography variant="h5">Information: </Typography>
                  <Typography>Namn: </Typography>
                  <Typography>Efternamn: </Typography>
                </Grid>
                <Grid item xs={4} >
                  <Grid container className={classes.products}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Products:</Typography>
                    </Grid>
                    {order.products[0].map((product) => (
                      <Grid item xs={12} className={classes.orderPaper} key={product._id}>
                        <Typography className={classes.title}>{product.name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={4} className={classes.delivery}>
                  <Typography variant="h5"> Delivery:</Typography>
                  <Typography>Alternative: {order.shipment.alternative}</Typography>
                  <Typography>Cost: {order.shipment.cost}</Typography>
                  <Typography>Days to delivery: {order.shipment.deliveryTime}</Typography>
                </Grid>
              </Grid>
            </Paper>
            <Grid container className={classes.total} justify="space-between">
              <Typography>Total:</Typography>
              <Typography>{order.totalPrice}</Typography>
            </Grid>
          </Grid>
        ))) : null}
    </Grid>
  )
}



export default Orders