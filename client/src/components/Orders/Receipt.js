import React, { useContext, useState, useEffect } from "react";
import useStyles from "./OrdersStyles";
import { Grid, Typography, Paper } from "@material-ui/core";
import { UserContext } from "../../Contexts/UserContext";
const Receipt = () => {
  const classes = useStyles();
  const { receipt, showReceipt, receipt, clearCartAndLocalStorage } = useContext(UserContext);
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
    setupSpecificOrders()   
    clearCartAndLocalStorage();
  }, []);

  return (
    <Grid container className={classes.mainDiv}>
      <Grid item xs={12}>
        <Typography variant="h3">Receipt</Typography>
      </Grid>
      {(receipt.shipment != undefined && showReceipt ? (
        <Grid container key={receipt._id} className={classes.receiptContainer}>
          <Paper className={classes.paper} style={{ width: " 100%" }}>
            <Grid container className={classes.receiptItems}>
              <Grid item xs={4} className={classes.information}>
                <Typography variant="h5">Information: </Typography>
                <Typography>Namn: {receipt.name}</Typography>
                <Typography>Efternamn: {receipt.lastname}</Typography>
              </Grid>
              <Grid item xs={4} >
                <Grid container className={classes.products}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Products:</Typography>
                  </Grid>
                  {receipt.products[0].map((product) => (
                    <Grid item xs={12} className={classes.orderPaper} key={product._id}>
                      <Typography className={classes.title}>{product.name}: {product.cartAmount}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={4} className={classes.delivery}>
                <Typography variant="h5"> Delivery:</Typography>
                <Typography>Alternative: {receipt.shipment.alternative}</Typography>
                <Typography>Cost: {receipt.shipment.cost}</Typography>
                <Typography>Days to delivery: {receipt.shipment.deliveryTime}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.information}>
              <Typography >Order-id: {receipt._id} </Typography>
            </Grid>
          </Paper>
          <Grid container className={classes.total} justify="space-between">
            <Typography variant="h5">Total:</Typography>
            <Typography variant="h5">{receipt.totalPrice}:-</Typography>
          </Grid>
        </Grid>
      )
        :
        specificOrders != undefined && !showReceipt &&
          specificOrders.map((order) => (
            <Grid container key={order._id} className={classes.orderContainer}>
              <Paper className={classes.paper} style={{ width: " 100%" }}>
                <Grid item xs={12} className={classes.information}>
                  <Typography variant="h5">Order: {order._id} </Typography>
                </Grid>
                <Grid item xs={12} className={classes.information}>
                  <Typography variant="h5">Order Date: {order.orderDate.split("T")[0]} </Typography>
                </Grid>
                <Grid container className={classes.orderItems}>
                  <Grid item xs={4} className={classes.information}>
                    <Typography variant="h5">Information: </Typography>
                    <Typography>Namn: {order.name}</Typography>
                    <Typography>Efternamn: {order.lastname}</Typography>
                  </Grid>
                  <Grid item xs={4} >
                    <Grid container className={classes.products}>
                      <Grid item xs={12}>
                        <Typography variant="h5">Products:</Typography>
                      </Grid>
                      {order.products[0].map((product) => (
                        <Grid item xs={12} className={classes.orderPaper} key={product._id}>
                          <Typography className={classes.title}>{product.name}: {product.cartAmount}</Typography>
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
                <Typography variant="h5">Total:</Typography>
                <Typography variant="h5">{order.totalPrice}:-</Typography>
              </Grid>
            </Grid>
         )))}
    </Grid>
  )
}

export default Receipt;
