// Hämta useContext för att använda funktioner i UserContext.
import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Badge,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Drawer,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { UserContext } from "../../Contexts/UserContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import useStyles from "./NavBarStyles";

const NavAppBar = withStyles({
  root: {
    backgroundColor: `rgb(139, 195, 74)`,
    background: `linear-gradient(352deg, ${green[400]} 0%, ${green[700]} 40%, ${green[900]} 98%)`,
  },
})(AppBar);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 10,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "2px 4px 1px 4px",
    fontSize: "0.6rem",
    margin: theme.spacing(1),
  },
}))(Badge);

const Categories = withStyles({
  root: {
    flexGrow: 1,
  },
})(Grid);

const NavButton = withStyles({
  root: {
    color: "white",
  },
})(Button);

const NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = useState(false);
  // Hämta openCart funktionen samt inloggad user från UserContext
  const {
    openCart,
    userData,
    amountOfItems,
    setUser,
    setAlert,
    setShowReceipt,
    setupLoggedInUser,
    loggedInUser,
  } = useContext(UserContext);

  const handleDrawerToggle = (props) => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.drawer}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={function (event) {
            history.push("/");
            handleDrawerToggle();
          }}
        >
          Home
        </ListItem>
        {props.categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={function (event) {
              history.push(`/category/${props.createSlug(category)}`);
              handleDrawerToggle();
            }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {userData.role === "admin" && (
          <>
            <ListItem
              button
              onClick={function (event) {
                history.push("/adminProductPage");
                handleDrawerToggle();
              }}
            >
              Edit Products
            </ListItem>
            <ListItem
              button
              onClick={function (event) {
                history.push("/orders");
                handleDrawerToggle();
              }}
            >
              See all orders
            </ListItem>
            <ListItem
              button
              onClick={function (event) {
                history.push("/adminRequests");
                handleDrawerToggle();
              }}
            >
              Admin Requests
            </ListItem>
          </>
        )}
        {userData && (
          <>
            <ListItem
              button
              onClick={function (event) {
                handleDontShowReceipt();
                handleDrawerToggle();
              }}
            >
              Your orders
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const logout = async () => {
    await fetch("http://localhost:8080/sessions/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setupLoggedInUser()
          setUser("");
          setAlert({ showAlert: true, type: "success", message: data.message });
          if (window.location.pathname !== "/") {
            history.push("/");
            return;
          }
        }
      });
  };

  const handleDontShowReceipt = () => {
    setShowReceipt(false);
    history.push("/receipt");
  };

  useEffect(() => {
    setupLoggedInUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavAppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Categories className={classes.desktopLinks} item>
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <NavButton aria-label="homepage" onClick={() => history.push("/")}>
              Home
            </NavButton>
            {props.categories.map((category) => {
              return (
                <NavButton
                  aria-label={`category ${category}`}
                  key={category}
                  onClick={() =>
                    history.push(`/category/${props.createSlug(category)}`)
                  }
                >
                  {category}
                </NavButton>
              );
            })}
          </Categories>

          <Grid justifycontent="flex-end" item>
            {userData !== '' && loggedInUser !== undefined && loggedInUser.adminRequest === 'admin' &&
              <Typography>Admin Request Pending</Typography>
            }
            {userData.role === "admin" ? (
              <>
                <NavButton
                  className={classes.desktopLinks}
                  aria-label="adminRequests"
                  onClick={() => history.push("/adminRequests")}
                >
                  Admin Requests
              </NavButton>
                <NavButton
                  className={classes.desktopLinks}
                  aria-label="orders"
                  onClick={() => history.push("/orders")}
                >
                  See all orders
                </NavButton>
                <NavButton
                  className={classes.desktopLinks}
                  aria-label="edit products"
                  onClick={() => history.push("/adminProductPage")}
                >
                  Edit Products
                </NavButton>
              </>
            ) : null}
            {userData !== "" && (
                <NavButton
                  className={classes.desktopLinks}
                  aria-label="yourOrders"
                  onClick={() => handleDontShowReceipt()}
                >
                  Your orders
              </NavButton>
            )}
            {userData === "" ? (
              <>
                <NavButton
                  aria-label="sign up"
                  onClick={() => history.push("/register")}
                >
                  Sign up
                </NavButton>
                <NavButton
                  aria-label="login"
                  onClick={() => history.push("/login")}
                >
                  Login
                </NavButton>
              </>
            ) : null}
            {userData !== "" && (
              <NavButton aria-label="log out" onClick={logout}>
                Logout
              </NavButton>
            )}
            {/* {window.location.pathname !== "/checkout" ? ( */}
            <StyledBadge color="secondary" badgeContent={amountOfItems()}>
              <IconButton
                style={{
                  width: "4rem",
                  color: "#333",
                }}
                edge="start"
                onClick={openCart}
              >
                <ShoppingCartIcon />
              </IconButton>
            </StyledBadge>
            {/* // ) : null} */}
          </Grid>
        </Toolbar>
      </NavAppBar>
    </>
  );
};

export default NavBar;
