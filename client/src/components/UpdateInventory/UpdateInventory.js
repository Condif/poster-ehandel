import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../AdminProductPage/AdminProductPageStyles";
import ProductCard from "../ProductCard/ProductCard";

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

//   return (
//     <div>
//       <p>{product.name}</p>
//       <p>{product.description}</p>
//       <p>{product.price} SEK</p>
//       <form onSubmit={updateProduct}>
//         <TextField
//           name={product._id}
//           style={{ width: 40 }}
//           label="Inventory"
//           type="number"
//           defaultValue={product.inventory}
//           onChange={(event) => handleChange(event, product._id)}
//         ></TextField>
//         <Button
//           type="submit"
//           style={{ marginLeft: "1rem" }}
//           size="small"
//           className={classes.submitButton}
//           variant="contained"
//           color="primary"
//         >
//           Update
//         </Button>
//       </form>
//     </div>
//   );
// }
