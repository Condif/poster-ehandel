import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Cart from './cart/Cart'
// import Login from './Login';
// import Register from './Register';
// import UserOrders from './UserOrders';
// import Checkout from './Checkout';
// import ProductView from './ProductView';
// import CategoryPage from './CategoryPage';
import Container from '@material-ui/core/Container';
import UserContextProvider from '../contexts/UserContext';



const Layout = (props) => {
    return (
        <UserContextProvider>
            <Router>
                <div className="App">
                    <Grid container spacing={4} justify="center">
                        <Cart />
                        <Header />
                        <Grid item xs={12}>
                            <NavBar />
                        </Grid>
                        <Container style={{ marginTop: '8px' }} maxWidth="md">
                            <Paper>
                                <Switch>
                                    <Route exact path="/">
                                        <Main />
                                    </Route>
                                    {/* 
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/category" component={CategoryPage} />
                                    <Route exact path="/checkout" component={Checkout} />
                                    <Route exact path="/orders" component={UserOrders} />
                                */}
                                </Switch>
                                {props.children}
                            </Paper>
                        </Container>
                    </Grid>
                </div>
            </Router >
        </UserContextProvider>

    )
}

// Funktion för att göra slug URL

// Funktion för att fetcha alla produkter och skicka som props till Main

export default Layout;