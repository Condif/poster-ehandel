import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    //State för cartModal
    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    // Logga in
    // Logga ut
    // Se senaste beställning

    return (
        <UserContext.Provider value={{ isCartOpen, openCart }}>
            {props.children}
        </UserContext.Provider>
    );

}

export default UserContextProvider