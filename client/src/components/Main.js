import React from "react";
// import { useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ProductCard from "./ProductCard/ProductCard";

const Main = (props) => {
  const { products, createSlug } = props;
  return (
    <Grid container spacing={4}>
      <Grid item>
        <Typography variant="h6">All Products</Typography>
      </Grid>
      <Grid item>
        {products !== null &&
          products !== undefined &&
          renderProducts("main", products, createSlug)}
      </Grid>
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
      <ProductCard
        case={caseStyle}
        key={product._id}
        product={product}
        path={`/product/${createSlug(product.name)}`}
      />
    );
  });
};

export default Main;
