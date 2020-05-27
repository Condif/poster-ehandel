import React, { useEffect, useState } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import Header from "./Header";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Cart from "./cart/Cart";
import { MainCard } from "./ProductFactory/ProductCards";
import Login from "./login/Login";
import UserContextProvider from "../contexts/UserContext";
import Register from "./register/Register";
// import Register from './Register';
// import UserOrders from './UserOrders';
// import Checkout from './Checkout';
// import ProductView from './ProductView';
// import CategoryPage from './CategoryPage';

const Layout = () => {
  const [products, setProducts] = useState([]);

  // Fetch products "on mount"
  useEffect(() => {
    async function getProducts() {
      setProducts(await getAllProducts());
    }
    getProducts();
  }, []);

  return (
    <Router>
      <UserContextProvider>
        <div className="App">
          <Grid container spacing={4} justify="center">
            <Cart />
            <Header />
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Container style={{ marginTop: "8px" }} maxWidth="md">
              <Paper>
                <Switch>
                  <Route exact path="/">
                    <Main products={products} createSlug={slugURL} />
                  </Route>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />

                  {products !== null &&
                    products &&
                    products.map((product) => {
                      return (
                        <Route
                          key={product._id}
                          exact
                          path={`/product/${slugURL(product.name)}`}
                        >
                          <MainCard
                            product={product}
                            path={`/product/${slugURL(product.name)}`}
                          />
                        </Route>
                      );
                    })}
                  {/* 
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/category" component={CategoryPage} />
                                    <Route exact path="/checkout" component={Checkout} />
                                    <Route exact path="/orders" component={UserOrders} />
                                */}
                </Switch>
              </Paper>
            </Container>
          </Grid>
        </div>
      </UserContextProvider>
    </Router>
  );
};

/**
 * Get all available products
 */
async function getAllProducts() {
  const products = await fetch("http://localhost:8080/api/products", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error is: ", error.error);
    });

  return products;
}

/**
 * Convert product name to slug URL
 * @param {string} string
 */
const slugURL = (string) => {
  string = string.replace(/^\s+|\s+$/g, ""); // trim
  string = string.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  string = string
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return string;
};

export default Layout;
