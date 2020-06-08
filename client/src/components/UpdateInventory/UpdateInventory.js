import React, { useState, useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../Contexts/UserContext";

export default function UpdateInventory(props) {
  const [inputValues, setInputValues] = useState({
    productId: "",
    productInventory: "",
  });

  const { setAlert } = useContext(UserContext);

  const { product } = props;

  function handleChange(event, id) {
    setInputValues({
      ...inputValues,
      productInventory: event.target.value,
      productId: id,
    });
  }

  function updateProduct(event) {
    event.preventDefault();

    product.inventory = inputValues.productInventory;

    fetch("http://localhost:8080/api/products/" + inputValues.productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        setAlert({ showAlert: true, type: "success", message: "Product inventory updated." });
      });
  }

  return (
    <Grid key={product._id} item sm={4}>
      <ProductCard
        case="updateInventory"
        product={product}
        updateProduct={updateProduct}
        handleChange={handleChange}
      ></ProductCard>
    </Grid>
  );
}
