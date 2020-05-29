import React, { useContext } from 'react';
import {
    Drawer,
    Typography,
    Grid,
} from "@material-ui/core";

import { UserContext } from '../../contexts/UserContext';
import CloseIcon from "@material-ui/icons/Close";
import ProductCard from '../ProductCard/ProductCard'


// STYLES
import useStyles from "./CartStyles";


const Cart = (props) => {

    const classes = useStyles();
    const { openCart, isCartOpen, cartList } = useContext(UserContext)
    const { createSlug } = props
    return (
        <div
            style={{
                overflowX: "hidden"
            }}>
            <Drawer
                style={{
                    overflowX: "hidden"
                }}
                anchor="right"
                open={isCartOpen}>
                <div className={classes.headerWrapper} >
                    <CloseIcon
                        className={classes.closeIcon}
                        onClick={openCart}
                    />
                    <Typography className={classes.header} variant="h4">
                        Cart
					        </Typography>
                </div>
                <div className={classes.listWrapper}>
                    <Grid item>
                        {cartList !== null && cartList !== undefined && renderProducts(cartList, createSlug)}
                    </Grid>
                </div>
            </Drawer>
        </div>
    )
}

const renderProducts = (cartList, createSlug) => {     
            return cartList.map(product => {
                const slug = createSlug(product.name);
                return (
                    <ProductCard case="cart" key={product._id} product={product} path={`/product/${slug}`} />
                )
            })
}

export default Cart;