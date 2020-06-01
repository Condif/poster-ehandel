import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import useStyles from "./AdminProductPageStyles";
import UpdateInventory from "../Updateinventory/UpdateInventory";

export default function AdminProductPage(props) {
  const { products } = props;
  const classes = useStyles();

  const [productInventoryList, setproductInventoryList] = useState([]);

  // function updateState() {
  //   console.log("hej");
  // }

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      <h1>Admin Product Page</h1>
      {products.map((product) => {
        return <UpdateInventory key={product._id} product={product} />;
      })}
    </Container>
  );
}
