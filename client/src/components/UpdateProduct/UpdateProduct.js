import React, { useState, useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../Contexts/UserContext";

export default function UpdateProduct(props) {
  const [inputValues, setInputValues] = useState({
    productId: props.product._id,
    productInventory: props.product.inventory,
    productCategory: props.product.category,
  });

  const { setAlert } = useContext(UserContext);

  const { product } = props;

  function handleChange(event, id, anchor) {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
      productId: id,
    });
  }

  function updateProduct(event) {
    event.preventDefault();

    const productCategory = product.category;
    const productInventory = product.inventory;

    product.inventory = inputValues.productInventory;
    product.category = inputValues.productCategory;

    fetch(
      "http://localhost:8080/api/products/updateProduct/" +
        inputValues.productId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      }
    )
      .then((res) => res.json())
      .then(() => {
        if (
          inputValues.productCategory !== productCategory ||
          inputValues.productInventory !== productInventory
        ) {
          setAlert({
            showAlert: true,
            type: "success",
            message: "Product updated.",
          });
        }
      });
  }

  return (
    <Grid key={product._id} item style={{ width: "100%" }} sm={5}>
      <ProductCard
        case="updateProduct"
        product={product}
        updateProduct={updateProduct}
        handleChange={handleChange}
      ></ProductCard>
    </Grid>
  );
}
