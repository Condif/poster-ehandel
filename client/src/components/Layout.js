import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import NavBar from './NavBar';
import Container from '@material-ui/core/Container';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const Layout = (props) => {
    return (
            <Grid container spacing={4} justify="center">
                <Header />
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Container style={{ marginTop: '8px' }} maxWidth="md">
                    <Paper>
                        {props.children}
                    </Paper>
                </Container>
            </Grid>

    )
}

export default Layout;