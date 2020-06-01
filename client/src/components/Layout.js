import React, { useEffect, useState } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import Header from "./Header";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./ProductGrid";
import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import UserContextProvider from "../Contexts/UserContext";
import ProductCard from "./ProductCard/ProductCard";
import Register from "./Register/Register";
import Checkout from "./Checkout/Checkout";
import AdminProductPage from "./AdminProductPage/AdminProductPage.js";
// import UserOrders from './UserOrders';
// import ProductView from './ProductView';
import CategoryPage from "./CategoryPage/CategoryPage";

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
            <Cart products={products} createSlug={createSlug} />
            <Header />
            <Grid item xs={12}>
              <NavBar
                createSlug={createSlug}
                categories={getCategories(products)}
              />
            </Grid>
            <Container style={{ marginTop: "8px" }} maxWidth="md">
              <Paper>
                <Switch>
                  <Route exact path="/">
                    <Main products={products} createSlug={createSlug} />
                  </Route>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/checkout" component={Checkout} />
                  <Route
                    path="/adminProductPage"
                    render={(props) => <AdminProductPage products={products} />}
                  />
                  {/* Get routes for each product */}
                  {products !== null &&
                    products.length !== 0 &&
                    products &&
                    products.map((product) => {
                      return (
                        <Route
                          exact
                          key={product._id}
                          path={`/product/${createSlug(product.name)}`}
                        >
                          <ProductCard
                            product={product}
                            path={`/product/${createSlug(product.name)}`}
                          />
                        </Route>
                      );
                    })}
                  {/* Get routes for category pages */}
                  {products !== null &&
                    products.length !== 0 &&
                    products &&
                    getCategories(products).map((category) => {
                      return (
                        <Route
                          exact
                          key={category}
                          path={`/category/${createSlug(category)}`}
                          render={() => (
                            <CategoryPage
                              createSlug={createSlug}
                              products={products}
                              category={category}
                            />
                          )}
                        />
                      );
                    })}
                  {/* <Route exact path="/orders" component={UserOrders} /> */}
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
 * Get all available products through fetch
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
 * Get list of all unique categories
 * @param {[]} products fetched list of all products
 */
const getCategories = (products) => {
  const categories = [];
  products.map((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return categories;
};

/**
 * Convert product name to slug URL
 * @param {string} string the string (product or category name) to convert to slug
 */
const createSlug = (string) => {
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
