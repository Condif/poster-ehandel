import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userData, setUserData] = useState("");
  // CartStates
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('products' || []))
  ) 
  
  const addToCartAndLocalStorage = (newProduct) => {
    if (!cartList) {
      newProduct.cartAmount ++
      setCartList([newProduct])
      localStorage.setItem("products", JSON.stringify([newProduct]))
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
          const lsList = JSON.parse(localStorage.getItem('products'))
          const lsProductIndex = lsList.findIndex((p) => p.name === existingProduct.name)
          state.splice(productIndex, 1, existingProduct);
          lsList.splice(lsProductIndex, 1, existingProduct);
          setCartList(state);
          localStorage.setItem("products", JSON.stringify(lsList))
        }

        if (!existingProduct) {
        

          const state = [...cartList];
          newProduct.cartAmount ++
          state.push(newProduct)
          setCartList(state);
          localStorage.setItem("products", JSON.stringify(state))
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
        addToCartAndLocalStorage,
        setCartList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
