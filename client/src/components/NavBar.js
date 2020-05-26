import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import lightGreen from '@material-ui/core/colors/lightGreen';
import teal from '@material-ui/core/colors/teal';

const NavAppBar = withStyles({
    root: {
        backgroundColor: `rgb(139, 195, 74)`,
        background: `linear-gradient(352deg, ${lightGreen[500]} 0%, ${teal[700]} 40%, ${teal[500]} 98%)`
    }
})(AppBar);

const Categories = withStyles({
    root: {
        flexGrow: 1,
    }
})(Grid);

const NavButton = withStyles({
    root: {
        color: 'white'
    }
})(Button);


const NavBar = () => {

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
                </Categories>
                <Grid item>
                    <NavButton aria-label="sign up">Sign up</NavButton>
                    <NavButton aria-label="login">Login</NavButton>
                </Grid>
            </Toolbar>
        </NavAppBar>
    )
}

export default NavBar;