import React from 'react';
// import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const Main = () => {
    return (
        <Grid container spacing={4}>
            <Grid item>
                <Typography>
                    Main Content (produkter osv)
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Main;