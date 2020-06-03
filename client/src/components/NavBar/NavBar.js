// Hämta useContext för att använda funktioner i UserContext.
import React, { useContext } from "react";
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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import teal from "@material-ui/core/colors/teal";
import { UserContext } from "../../Contexts/UserContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import useStyles from "./NavBarStyles";

const NavAppBar = withStyles({
  root: {
    backgroundColor: `rgb(139, 195, 74)`,
    background: `linear-gradient(352deg, ${lightGreen[500]} 0%, ${teal[700]} 40%, ${teal[500]} 98%)`,
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

  const [mobileOpen, setMobileOpen] = React.useState(false);
  // Hämta openCart funktionen samt inloggad user från UserContext
  const { openCart, userData, amountOfItems } = useContext(UserContext);

  const handleDrawerToggle = (props) => {
    setMobileOpen(!mobileOpen);
  };

  const { window } = props;

  const drawer = (
    <div className={classes.drawer}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
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
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <NavAppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
        <Categories className={classes.desktopLinks} item>
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
        </Grid>
      </Toolbar>
    </NavAppBar>
  );
};

export default NavBar;
