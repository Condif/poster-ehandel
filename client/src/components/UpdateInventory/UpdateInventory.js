import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function UpdateInventory(props) {
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
        alert("Product inventory updated.");
      });
  }

  return (
    <ProductCard
      case="updateInventory"
      product={product}
      updateProduct={updateProduct}
      handleChange={handleChange}
    ></ProductCard>
  );
}
