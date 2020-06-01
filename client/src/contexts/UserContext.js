import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userData, setUserData] = useState("");
  // CartStates
  const [cartList, setCartList] = useState()
  
  const addToCart = (newProduct) => {
    if (cartList === undefined) {
      newProduct.cartAmount ++
      setCartList([newProduct])
    } else {
      let existingProduct;

      if (cartList) {
        cartList.forEach((product) => {
          if (newProduct.name === product.name) {
            existingProduct = product;
          }
        });
        if (existingProduct) {
          existingProduct.cartAmount++;
          const state = [...cartList];
          const productIndex = state.findIndex(
            (p) => p.name === existingProduct.name
          );
          state.splice(productIndex, 1, existingProduct);
          setCartList(state);
        }

        if (!existingProduct) {
          const state = [...cartList];
          newProduct.cartAmount ++
          state.push(newProduct)
          setCartList(state);
        }
      }
    }
  };

  //State för cartModal
  const openCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const setUser = (user) => {
    setUserData({
      email: user.email,
      role: user.role,
      deliveryAddress: user.deliveryAddress[0],
    });
  };

  // Logga in
  // Logga ut
  // Se senaste beställning

  return (
    <UserContext.Provider
      value={{
        isCartOpen,
        userData,
        cartList,
        openCart,
        setUser,
        addToCart,
        setCartList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
