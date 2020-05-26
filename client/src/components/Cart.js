import React, {useContext} from 'react';
import {
    Drawer,
    Typography,
    Button
} from "@material-ui/core";

import { UserContext } from '../contexts/UserContext';
import CloseIcon from "@material-ui/icons/Close";


const Cart = () => {
    const { openCart } = useContext(UserContext)
    return (
        <UserContext.Consumer>
            {userContext => (
                <div
                    style={{
                        overflowX: "hidden"
                    }}>
                    <Drawer
                        style={{
                            overflowX: "hidden"
                        }}
                        anchor="right"
                        open={userContext.isCartOpen}>
                        <div >
                            <CloseIcon
                                onClick={openCart}
                            />
                            <Typography variant="h4">
                                Cart
					        </Typography>
                        </div>
                    </Drawer>
                </div>
            )}
        </UserContext.Consumer>
    )
}

export default Cart;