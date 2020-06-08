import React, { useContext } from "react";
import useStyles from "./OrdersStyles";
import { Grid, Typography, Paper } from "@material-ui/core";
import { UserContext } from '../../Contexts/UserContext'
const Receipt = () => {
    const classes = useStyles();
    const { receipt } = useContext(UserContext);

    return (
        <Grid container className={classes.mainDiv}>
      <Grid item xs={12}>
        <Typography variant="h3">Receipt</Typography>
      </Grid>
      {(receipt.shipment != undefined &&
          <Grid container key={receipt._id}className={classes.receiptContainer}>
            <Paper className={classes.paper}style={{ width: " 100%" }}>
              <Grid item xs={12} className={classes.information}>
                <Typography variant="h4">receipt: {receipt._id} </Typography>
              </Grid>
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
                  </Grid>
                </Grid>
                <Grid item xs={4} className={classes.delivery}>
                  <Typography variant="h5"> Delivery:</Typography>
                  <Typography>Alternative: {receipt.shipment.alternative}</Typography>
                  <Typography>Cost: {receipt.shipment.cost}</Typography>
                  <Typography>Days to delivery: {receipt.shipment.deliveryTime}</Typography>
                </Grid>
              </Grid>
            </Paper>
            <Grid container className={classes.total} justify="space-between">
              <Typography>Total:</Typography>
              <Typography>{receipt.totalPrice}</Typography>
            </Grid>
          </Grid>
      )}
    </Grid>
    )
}

export default Receipt