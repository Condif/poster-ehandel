import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import useStyles from "./ProductCardStyles";
import { UserContext } from "../../Contexts/UserContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const ProductCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { product, path } = props;
  const { addToCartAndLocalStorage, updateCounter, deleteProduct } = useContext(UserContext);


  const handleClick = () => {
    if (props.case !== "cart" || props.case !== "checkout")
      return history.push(path);
  };

  const handleAddToCart = () => {
    addToCartAndLocalStorage(product);
  };

  return (
    <Grid className={classes.root} item>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={`http://localhost:8080/api/image/product/${product._id}`} />
          <CardHeader
            title={product.name}
            titleTypographyProps={{ variant: "h6" }}
            classes={
              props.case === "cart"
                ? { title: classes.titleCart }
                : { title: classes.title }
            }
          />
          <Typography>{product.name}</Typography>
          <Typography>{product.description}</Typography>
          {product.cartAmount > 1 && (
            <Typography>{product.cartAmount} items</Typography>
          )}
          {product.cartAmount == 1 && (
            <Typography>{product.cartAmount} item</Typography>
          )}
          <Typography>{product.price}SEK</Typography>
        </CardActionArea>
        <CardActions>
          {props.case === "main" ? (
            <>
              <Button size="small" onClick={handleClick}>
                View product
              </Button>
              <Button size="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </>
          ) : props.case === "updateInventory" ? (
            <form onSubmit={props.updateProduct}>
              <TextField
                name={product._id}
                style={{ width: 40 }}
                label="Inventory"
                type="number"
                defaultValue={product.inventory}
                onChange={(event) => props.handleChange(event, product._id)}
              ></TextField>
              <Button
                type="submit"
                style={{ marginLeft: "1rem" }}
                size="small"
                className={classes.submitButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </form>
          ) : null}
          {props.case === "cart" || props.case === "checkout" ? (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => updateCounter(product, "add")}
              >
                <AddCircleOutlineIcon />
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => updateCounter(product, "remove")}
              >
                <RemoveCircleOutlineIcon />
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => deleteProduct(product)}
              >
                <DeleteIcon />
              </Button>
            </>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
