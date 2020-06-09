import React, { useEffect, useState, useContext } from "react";
import { Grid, Container } from "@material-ui/core";
import Header from "./Header";
import NavBar from "./NavBar/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import ProductCard from "./ProductCard/ProductCard";
import Register from "./Register/Register";
import Checkout from "./Checkout/Checkout";
import AdminProductPage from "./AdminProductPage/AdminProductPage";
// import UserOrders from './UserOrders';
// import ProductView from './ProductView';
import CategoryPage from "./CategoryPage/CategoryPage";
import Orders from "./Orders/Orders";
import Receipt from "./Orders/Receipt";
import { UserContext } from "../Contexts/UserContext";
import { CheckoutContext } from "../Contexts/CheckoutContext";
import Footer from "./Footer/Footer";
import AlertMessage from "./AlertMessage/AlertMessage";

const Layout = () => {
  const { setUser, isAdmin, userData, alert, setAlert, orderPlaced } = useContext(
    UserContext
  );

  const [products, setProducts] = useState([]);

  const [fetchingUserData, setfetchingUserData] = useState(true);

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

  const getCategories = (products) => {
    const categories = [];
    products.map((product) => {
      if (!categories.includes(product.category)) {
        return categories.push(product.category);
      }
      return null;
    });

    return categories;
  };

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

  const AdminRoute = (props) => (
    <Route
      path={props.path}
      render={() =>
        fetchingUserData === true ? (
          <p>Loading</p>
        ) : isAdmin() ? (
          props.children
        ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { redirectedFrom: window.location.pathname },
                }}
              />
            )
      }
    />
  );

  const LoggedInRoute = (props) => (
    <Route
      path={props.path}
      render={() =>
        fetchingUserData === true ? (
          <p>Loading</p>
        ) : userData ? (
          props.children
        ) : (
              <>
                <Redirect to="/login" />
              </>
            )
      }
    />
  );

  const checkLoginSession = () => {
    setfetchingUserData(true);
    fetch("http://localhost:8080/sessions/checkLoginSession", {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      const data = await response.json();
      if (data.error) {
        setfetchingUserData(false);
        return;
      }
      setUser(data);
      setfetchingUserData(false);
    });
  };

  // Fetch products "on mount"
  useEffect(() => {
    async function fetchOnLoad() {
      checkLoginSession();
      setProducts(await getAllProducts());
    }
    fetchOnLoad();
    // eslint-disable-next-line
  }, [orderPlaced]);

  return (
    <Router>
      <div className="App">
        {alert.showAlert && (
          <AlertMessage
            setAlert={setAlert}
            alert={alert}
            show={alert.showAlert}
            clickAway={(timeout) => {
              clearTimeout(timeout);
              setAlert({ showAlert: false, type: null, message: null });
            }}
            type={alert.type}
          >
            {alert.message}
          </AlertMessage>
        )}
        <Grid container justify="center">
          <Cart products={products} createSlug={createSlug} />
          <Header />
          <Grid item xs={12}>
            <NavBar
              createSlug={createSlug}
              categories={getCategories(products)}
            />
          </Grid>
          <Container
            style={{ marginTop: "20px", minHeight: "calc(100vh - 345px)" }}
            maxWidth="md"
          >
            <Switch>
              <Route exact path="/">
                <ProductGrid
                  products={products}
                  createSlug={createSlug}
                  setAlert={setAlert}
                />
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <AdminRoute path="/orders">
                <Orders />
              </AdminRoute>
              <Route path="/receipt" component={Receipt} />
              <LoggedInRoute path="/checkout">
                <Checkout />
              </LoggedInRoute>
              <AdminRoute path="/adminProductPage">
                <AdminProductPage products={products} />
              </AdminRoute>
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
                        case={"productview"}
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
          </Container>
          <Footer />
        </Grid>
      </div>
    </Router>
  );
};

export default Layout;
