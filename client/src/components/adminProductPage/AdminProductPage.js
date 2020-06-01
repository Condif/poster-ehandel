import React from "react";
import Container from "@material-ui/core/Container";
import useStyles from "./AdminProductPageStyles";
import UpdateInventory from "../UpdateInventory/UpdateInventory.js";

export default function AdminProductPage(props) {
  const { products } = props;
  const classes = useStyles();

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      <h1>Admin Product Page</h1>
      {products.map((product) => {
        return <UpdateInventory key={product._id} product={product} />;
      })}
    </Container>
  );
}
