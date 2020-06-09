import React, { useContext, useState, useEffect } from "react";
import useStyles from "./OrdersStyles";
import { Grid, Typography, Paper } from "@material-ui/core";
import { UserContext } from "../../Contexts/UserContext";
const Receipt = () => {
  const classes = useStyles();
  const { receipt, showReceipt } = useContext(UserContext);
  const [specificOrders, setSpecificOrders] = useState();

  const getSpecificOrders = async () => {
    const newSpecificOrders = await fetch("http://localhost:8080/api/orders/byId", {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json())
      .then((data) => {
        return data
      })
    return newSpecificOrders
  };

  const setupSpecificOrders = async () => {
    const newSpecificOrders = await getSpecificOrders()
    setSpecificOrders(newSpecificOrders)
  }

  useEffect(() => {
    setupSpecificOrders();
  }, []);
        
  return (
    <>
      {(receipt.shipment !== undefined && showReceipt ? (
        
        <Grid
          container
          key={receipt._id}
          data-id={receipt._id}
          className={classes.orderContainer}
        >
          <Paper className={classes.paper} style={{ width: " 100%" }}>
            <Grid item xs={12} className={classes.information}>
              <Typography className={classes.heading} variant="h6">
                Order: {receipt._id}{" "}
              </Typography>
              <Typography className={classes.heading} variant="h6">
                Order Date: {receipt.orderDate.split("T")[0]}{" "}
              </Typography>
            </Grid>
            <Grid container className={classes.orderItems}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Information: </Typography>
                <Typography>Name: {receipt.name}</Typography>
                <Typography>Lastname: {receipt.lastname}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container className={classes.products}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Products:</Typography>
                  </Grid>
                  {receipt.products[0].map((product) => (
                    <Grid
                      item
                      xs={12}
                      className={classes.orderPaper}
                      key={product._id}
                    >
                      <Typography className={classes.title}>
                        {product.cartAmount} {product.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.delivery}>
                <Typography variant="h6"> Delivery:</Typography>
                <Typography>
                  Alternative: {receipt.shipment.alternative}
                </Typography>
                <Typography>Cost: {receipt.shipment.cost} SEK</Typography>
                <Typography>
                  Days to delivery: {receipt.shipment.deliveryTime}
                </Typography>
                <Typography>
                  Shipped:{" "}
                  {receipt.shipped === false ? "Not shipped" : "Shipped"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.priceAndShipped}>
              <Grid item xs={12} sm={6} className={classes.total}>
                <Typography>Total cost: {receipt.totalPrice} SEK </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
        :
        specificOrders !== undefined && !showReceipt &&
        specificOrders.map((order) => (
          
          <Grid
            container
            key={order._id}
            data-id={order._id}
            className={classes.orderContainer}
          >
            <Paper className={classes.paper} style={{ width: " 100%" }}>
              <Grid item xs={12} className={classes.information}>
                <Typography className={classes.heading} variant="h6">
                  Order: {order._id}{" "}
                </Typography>
                <Typography className={classes.heading} variant="h6">
                  Order Date: {order.orderDate.split("T")[0]}{" "}
                </Typography>
              </Grid>
              <Grid container className={classes.orderItems}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6">Information: </Typography>
                  <Typography>Name: {order.name}</Typography>
                  <Typography>Lastname: {order.lastname}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid container className={classes.products}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Products:</Typography>
                    </Grid>
                    {order.products[0] !== undefined && 
                      order.products[0].map((product) => (
                      <Grid
                        item
                        xs={12}
                        className={classes.orderPaper}
                        key={product._id}
                      >
                        <Typography className={classes.title}>
                          {product.cartAmount} {product.name}
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
                  <Typography>
                    Shipped:{" "}
                    {order.shipped === false ? "Not shipped" : "Shipped"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.priceAndShipped}>
                <Grid item xs={12} sm={6} className={classes.total}>
                  <Typography>Total cost: {order.totalPrice} SEK </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )))}
    </>
  )
}

export default Receipt;
