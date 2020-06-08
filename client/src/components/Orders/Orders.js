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
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return allOrders;
  };

  const setupOrders = async () => {
    const allOrders = await getAllOrders();
    setOrders(allOrders);
  };

  useEffect(() => {
    setupOrders();
  }, []);

  return (
    <Grid container>
      {orders != undefined
        ? orders.map((order) => (
            <Grid container key={order._id} className={classes.orderContainer}>
              <Paper className={classes.paper} style={{ width: " 100%" }}>
                <Grid item xs={12} className={classes.information}>
                  <Typography className={classes.heading} variant="h6">
                    Order: {order._id}{" "}
                  </Typography>
                </Grid>
                <Grid container className={classes.orderItems}>
                  <Grid item xs={12} sm={4} className={classes.information}>
                    <Typography variant="h6">Information: </Typography>
                    <Typography>Name: {order.name}</Typography>
                    <Typography>Lastname: {order.lastname}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Grid container className={classes.products}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Products:</Typography>
                      </Grid>
                      {order.products[0].map((product) => (
                        <Grid
                          item
                          xs={12}
                          className={classes.orderPaper}
                          key={product._id}
                        >
                          <Typography className={classes.title}>
                            {product.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.delivery}>
                    <Typography variant="h6"> Delivery:</Typography>
                    <Typography>
                      Alternative: {order.shipment.alternative}
                    </Typography>
                    <Typography>Cost: {order.shipment.cost} SEK</Typography>
                    <Typography>
                      Days to delivery: {order.shipment.deliveryTime}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.total}>
                  <Typography>Total cost: {order.totalPrice} SEK </Typography>
                </Grid>
              </Paper>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default Orders;
