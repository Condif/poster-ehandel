import React, { useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard/ProductCard";
import { useLocation } from "react-router-dom";

const Main = (props) => {
  const { products, createSlug, setAlert } = props;

  const location = useLocation();

  let redirectedFrom;

  if (location.state) {
    redirectedFrom = location.state.redirectedFrom;
  }

  useEffect(() => {
    if (redirectedFrom === "/adminProductPage") {
      setAlert({
        showAlert: true,
        type: "error",
        message: "You are not authorized to view that page.",
      });
    }
    // eslint-disable-next-line
  }, [redirectedFrom]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      {products !== null &&
        products !== undefined &&
        renderProducts("main", products, createSlug)}
    </Grid>
  );
};
/**
 * Render each product
 * @param {string} caseStyle
 * @param {[]} products fetched list of products
 * @param {() => string} createSlug creates slug url path from product name
 * @return {JSX.Element} product card component
 */
export const renderProducts = (caseStyle, products, createSlug) => {
  return products.map((product) => {
    return (
      <Grid key={product._id} style={{ width: "100%" }} item sm={6}>
        <ProductCard
          case={caseStyle}
          product={product}
          path={`/product/${createSlug(product.name)}`}
        />
      </Grid>
    );
  });
};

export default Main;
