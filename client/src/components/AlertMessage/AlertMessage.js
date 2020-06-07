import React, { useState } from 'react';
import useStyles from './AlertMessageStyles';
import { Alert } from '@material-ui/lab';
import Fade from "@material-ui/core/Fade";
import { ClickAwayListener } from "@material-ui/core";

const AlertMessage = (props) => {
    const classes = useStyles();

    const [fadeIn, setFadeIn] = useState(true);

    const animationTimeout = () => setTimeout(() => {
        setFadeIn(false);
    }, 5000);

    animationTimeout();

    const handleClickAway = () => {
        setFadeIn(false);
        clearTimeout(animationTimeout);
        props.clickAway(false);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Fade in={fadeIn} timeout={200}>
                <Alert
                    elevation={1}
                    className={classes.root}
                    severity={props.type}>
                    {props.children}
                </Alert>
            </Fade>
        </ClickAwayListener>
    )
}

export default AlertMessage;