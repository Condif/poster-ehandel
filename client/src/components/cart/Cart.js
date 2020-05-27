import React, {useContext} from 'react';
import {
    Drawer,
    Typography,
} from "@material-ui/core";

import { UserContext } from '../../contexts/UserContext';
import CloseIcon from "@material-ui/icons/Close";
// STYLES
import useStyles from "./CartStyles";


const Cart = () => {
    const classes = useStyles();
    const { openCart, isCartOpen } = useContext(UserContext)
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
                        <div className={classes.listWrapper}></div>
                    </Drawer>
                </div>
    )
}

export default Cart;