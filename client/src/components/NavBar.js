// Hämta useContext för att använda funktioner i UserContext.
import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Badge,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import teal from "@material-ui/core/colors/teal";
import { UserContext } from "../Contexts/UserContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";

const NavAppBar = withStyles({
  root: {
    backgroundColor: `rgb(139, 195, 74)`,
    background: `linear-gradient(352deg, ${lightGreen[500]} 0%, ${teal[700]} 40%, ${teal[500]} 98%)`,
  },
})(AppBar);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 10,
    top: 16,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "2px 4px 1px 4px",
    fontSize: "0.6rem",
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
  const history = useHistory();
  // Hämta openCart funktionen samt inloggad user från UserContext
  const { openCart, userData } = useContext(UserContext);
  return (
    <NavAppBar position="static">
      <Toolbar>
        <Categories item>
          <NavButton aria-label="homepage" onClick={() => history.push("/")}>Home</NavButton>
          {props.categories.map(category => {
            return (
              <NavButton aria-label={`category ${category}`} key={category} onClick={() => history.push(`/category/${props.createSlug(category)}`)}>{category}</NavButton>
            )
          })}
          <StyledBadge color="secondary">
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
        </Categories>
        <Grid item>
          {userData.role === "admin" && (
            <NavButton
              aria-label="edit products"
              onClick={() => history.push("/adminProductPage")}
            >
              Edit Products
            </NavButton>
          )}
          <NavButton
            aria-label="sign up"
            onClick={() => history.push("/register")}
          >
            Sign up
          </NavButton>
          <NavButton aria-label="login" onClick={() => history.push("/login")}>
            Login
          </NavButton>
        </Grid>
      </Toolbar>
    </NavAppBar>
  );
};

export default NavBar;
