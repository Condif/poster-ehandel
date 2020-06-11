import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userForBadge, setUserForBadge] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [userData, setUserData] = useState("");
  const [alert, setAlert] = useState({
    showAlert: false,
    type: null,
    message: null,
  });
  const [loginPopup, setLoginPopup] = useState({
    showLogin: false,
    message: null,
  });
  const [orderPlaced, setOrderPlaced] = useState(Date.now());

  const [receipt, setReceipt] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  const handleReceipt = (newReceipt) => {
    setReceipt(newReceipt);
    setShowReceipt(true);
  };
  // CartStates
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("products" || []))
  );

  const addToCartAndLocalStorage = (newProduct) => {
    if (!cartList) {
      newProduct.cartAmount++;
      setCartList([newProduct]);
      localStorage.setItem("products", JSON.stringify([newProduct]));
    }
    if (JSON.parse(localStorage.getItem("products")) === null) {
      localStorage.setItem("products", JSON.stringify(cartList));
    }
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
        const lsList = JSON.parse(localStorage.getItem("products"));
        const lsProductIndex = lsList.findIndex(
          (p) => p.name === existingProduct.name
        );
        state.splice(productIndex, 1, existingProduct);
        lsList.splice(lsProductIndex, 1, existingProduct);
        setCartList(state);
        localStorage.setItem("products", JSON.stringify(lsList));
      }

      if (!existingProduct) {
        const state = [...cartList];
        newProduct.cartAmount++;
        state.push(newProduct);
        setCartList(state);
        localStorage.setItem("products", JSON.stringify(state));
      }
    }
  };

  const updateCounter = (product, anchor) => {
    if (anchor === "add") {
      product.cartAmount++;
    }
    if (anchor === "remove") {
      product.cartAmount--;
    }
    const state = [...cartList];
    const productIndex = state.findIndex((p) => p.name === product.name);

    if (product.cartAmount < 1) {
      state.splice(productIndex, 1);
    } else {
      state.splice(productIndex, 1, product);
    }

    setCartList(state);
    localStorage.setItem("products", JSON.stringify(state));
  };

  const clearCartAndLocalStorage = () => {

    setCartList([]);
    localStorage.removeItem("products");
  };

  const deleteProduct = (product) => {
    const state = [...cartList];
    const productIndex = state.findIndex((p) => p.name === product.name);
    state[productIndex].cartAmount = 0;
    state.splice(productIndex, 1);
    setCartList(state);
    localStorage.setItem("products", JSON.stringify(state));
  };

  //State för cartModal
  const openCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const isAdmin = () => {
    return userData.role === "admin";
  };

  const setUser = (user) => {
    if (user === "" || user.error) {
      setUserData("");
      return;
    }
    if (!user.error) {
      setUserData({
        email: user.email,
        role: user.role,
        deliveryAddress: user.deliveryAddress[0],
      });
    }
  };

  function totalCost() {
    if (cartList === null) return
    if (cartList.length === 0) return
    const totalCost = cartList.reduce((total, product) => {
      return total + product.cartAmount * product.price;
    }, 0);
    return totalCost;
  }

  function amountOfItems() {
    if (cartList === null) return
    if (cartList.length === 0) return

    const itemsAmount = cartList.reduce((amount, product) => {
      return amount + product.cartAmount;
    }, 0);
    return itemsAmount;
  }

  const getLoggedInUser = async () => {
    const newLoggedInUser = await fetch("http://localhost:8080/api/users/loggedIn", {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json())
      .then((data) => {
        return data
      })
    return newLoggedInUser
  }


  const setupLoggedInUser = async () => {
    const newLoggedInUser = await getLoggedInUser()
    setLoggedInUser(newLoggedInUser)
  }

  const getSpecificUsers = async () => {
    const newSpecificUsers = await fetch(
      "http://localhost:8080/api/users/adminRequest",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return newSpecificUsers;
  };
  const setupUserForBadge = async () => {
    const newSpecificUsers = await getSpecificUsers();
    //Eftersom useEffect bara ska köras 1 gång ska statet bara sättas en gång
    setUserForBadge(newSpecificUsers);
  };

  

  return (
    <UserContext.Provider
      value={{
        isCartOpen,
        userData,
        cartList,
        receipt,
        showReceipt,
        loggedInUser,
        userForBadge,
        getSpecificUsers,
        setupUserForBadge,
        setupLoggedInUser,
        setShowReceipt,
        handleReceipt,
        setReceipt,
        isAdmin,
        openCart,
        setUser,
        addToCartAndLocalStorage,
        setCartList,
        updateCounter,
        clearCartAndLocalStorage,
        deleteProduct,
        totalCost,
        amountOfItems,
        alert,
        setAlert,
        loginPopup,
        setLoginPopup,
        setOrderPlaced,
        orderPlaced,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
