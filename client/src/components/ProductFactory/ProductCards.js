import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Card, CardHeader, CardActions, CardActionArea } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import useStyles from './ProductCardStyles/MainCardStyles';
import ProductCard from './ProductCard'

const MainCard = (props) => {
    const { product, path} = props;


    return (
        <>
            <ProductCard case={props.case} product={product} path={path}/>
        </>
    )
}

const CartCard = (props) => {
    const { product, path} = props;


    return (
        <>
            <ProductCard case={props.case} product={product} path={path}/>
        </>
    )
}



export {MainCard, CartCard};