import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../AdminProductPage/AdminProductPageStyles";

export default function UpdateInventory(props) {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState({
    productId: "",
    productInventory: "",
  });

  const { product } = props;

  function handleChange(event, id) {
    setInputValues({
      ...inputValues,
      productInventory: event.target.value,
      productId: id,
    });
  }

  //TODO kopiera sedan modifiera - sedan state (Object.assign)
  function updateProduct(event) {
    event.preventDefault();

    // const newProduct = product;
    product.inventory = inputValues.productInventory;
    // Object.assign();

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
        alert("Product inventory updated.");
      });
  }

  return (
    <div>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price} SEK</p>
      <form onSubmit={updateProduct}>
        <TextField
          name={product._id}
          style={{ width: 40 }}
          label="Inventory"
          type="number"
          defaultValue={product.inventory}
          onChange={(event) => handleChange(event, product._id)}
        ></TextField>
        <Button
          type="submit"
          style={{ marginLeft: "1rem" }}
          size="small"
          className={classes.submitButton}
          variant="contained"
          color="primary"
          // onClick={(event) => updateProducts(product._id, event)}
        >
          Update
        </Button>
      </form>
    </div>
  );
}
