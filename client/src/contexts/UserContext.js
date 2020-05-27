import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userData, setUserData] = useState("");

  //State för cartModal
  const openCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const setUser = (user) => {
    setUserData({ email: user.email, role: user.role });
  };

  // Logga in
  // Logga ut
  // Se senaste beställning

  return (
    <UserContext.Provider value={{ isCartOpen, userData, openCart, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
