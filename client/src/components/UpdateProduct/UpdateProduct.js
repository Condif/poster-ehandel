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
    let categories = null;
    const value = event.target.value;
    const checked = event.target.checked;

    if (anchor === "productCategory") {
      categories = inputValues.productCategory;
      if (checked === true && !categories.includes(value)) {
        categories.push(value);
      } else if (!checked && categories.includes(value)) {
        categories.splice(categories.indexOf(value), 1)
      }
    }

    setInputValues({
      ...inputValues,
      [anchor]: categories === null ? event.target.value : categories,
      productId: id,
    });
  }

  function updateProduct(event) {
    event.preventDefault();

    const productCategory = product.category;
    const productInventory = product.inventory;

    product.inventory = inputValues.productInventory;
    product.category = inputValues.productCategory;
    delete product.__v;

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
      .then(async (res) => {
        const json = await res.json();
        if (res.status !== 200) {
          throw new Error(json.message)
        }
        return json;
      })
      .then((json) => {
        setAlert({
          showAlert: true,
          type: "success",
          message: json,
        });
      })
      .catch((error) => {
        setAlert({
          showAlert: true,
          type: "error",
          message: error.toString()
        })
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
