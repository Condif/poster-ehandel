import { renderProducts } from "../ProductGrid";
import Grid from "@material-ui/core/Grid";
import React from "react";

const CategoryPage = (props) => {
  const products = getProducts(props);
  return (
    <Grid container spacing={2} alignItems="stretch">
      {renderProducts("main", products, props.createSlug)}
    </Grid>
  );
};

/**
 * Get list of products in category
 * @param {Object} props
 * @param {string} props.pageCategory
 * @param {{}} props.products
 * @return {[{}]} list of products in category
 */
const getProducts = ({ category, products }) => {
  const categoryProducts = [];
  products.map((product) => {
    product.category.forEach(productCategory => {
      if (productCategory === category) {
        categoryProducts.push(product);
      }
      return categoryProducts;
    })
  });
  return categoryProducts;
};

export default CategoryPage;
