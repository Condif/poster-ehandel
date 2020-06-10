import React from "react";
import UpdateProduct from "../UpdateProduct/UpdateProduct.js";
import Grid from "@material-ui/core/Grid";

export default function AdminProductPage(props) {
  const { products } = props;

  return (
    <Grid container spacing={2} alignItems="stretch" justify="center">
      {products.map((product) => {
        return <UpdateProduct key={product._id} product={product} />;
      })}
    </Grid>
  );
}
