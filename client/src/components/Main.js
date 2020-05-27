import React from "react";
// import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ProductFactory from './ProductFactory/ProductFactory'

const Main = (props) => {
    const { products, createSlug } = props;
    return (
        <Grid container spacing={4}>
            <Grid item>
                <Typography variant="h6">All Products</Typography>
            </Grid>
            <Grid item>
            {products !== null && products !== undefined && renderProducts(products, createSlug)}
            </Grid>
        </Grid >
    )
}

/**
 * 
 * @param {[]} products 
 * @param {() => string} createSlug 
 */
const renderProducts = (products, createSlug) => {
    
    return products.map(product => {
        const slug = createSlug(product.name);
        return (
            <ProductFactory case="main" key={product._id} product={product} path={slug}/>
        )
    })
}

export default Main;
