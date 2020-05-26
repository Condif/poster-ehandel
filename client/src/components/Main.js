import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { Typography, withStyles } from '@material-ui/core';

const Main = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={4}>
            <Grid item>
                <Typography>
                    Hello
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Main;