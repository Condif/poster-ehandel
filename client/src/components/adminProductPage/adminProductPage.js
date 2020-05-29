import React, { useState, useContext, useRef } from "react";
import Container from "@material-ui/core/Container";
import useStyles from "./adminProductPageStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function AdminProductPage(props) {
  const { products } = props;
  const classes = useStyles();

  const textInput = useRef();

  const [inputValues, setInputValues] = useState({
    productId: "",
    productInventory: "",
  });

  function updateProducts(id, event) {
    event.preventDefault();
    console.log(event.currentTarget.previousSibling);
  }

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      {console.log(inputValues.productId)}
      {console.log(inputValues.productInventory)}
      <h1>Admin Product Page</h1>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price} SEK</p>
            <form>
              <TextField
                ref={textInput}
                style={{ width: 40 }}
                label="Inventory"
                type="number"
                defaultValue={product.inventory}
                // onChange={(event) => handleChange(event, product._id)}
              ></TextField>
              <Button
                type="submit"
                style={{ marginLeft: "1rem" }}
                size="small"
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={(event) => updateProducts(product._id, event)}
              >
                Update
              </Button>
            </form>
          </div>
        );
      })}
    </Container>
  );
}
