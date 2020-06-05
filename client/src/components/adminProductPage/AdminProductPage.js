import React from "react";
import UpdateInventory from "../UpdateInventory/UpdateInventory.js";
import Grid from "@material-ui/core/Grid";

export default function AdminProductPage(props) {
  const { products } = props;

  return (
    <Grid container spacing={2} alignItems="stretch">
      {products.map((product) => {
        return <UpdateInventory key={product._id} product={product} />;
      })}
    </Grid>
  );
}
