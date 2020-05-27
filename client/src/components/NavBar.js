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
import { UserContext } from "../contexts/UserContext";
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

const NavBar = () => {
  const history = useHistory();
  // Hämta openCart funktionen från UserContext
  const { openCart } = useContext(UserContext);
  return (
    <NavAppBar position="static">
      <Toolbar>
        <Categories item>
          <NavButton aria-label="homepage">Home</NavButton>
          <NavButton aria-label="category1">Category1</NavButton>
          <NavButton aria-label="category2">Category2</NavButton>
          <NavButton aria-label="category3">Category3</NavButton>
          <NavButton aria-label="category4">Category4</NavButton>
          <NavButton aria-label="category5">Category5</NavButton>
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
          <NavButton aria-label="sign up">Sign up</NavButton>
          <NavButton aria-label="login" onClick={() => history.push("/login")}>
            Login
          </NavButton>
        </Grid>
      </Toolbar>
    </NavAppBar>
  );
};

export default NavBar;
