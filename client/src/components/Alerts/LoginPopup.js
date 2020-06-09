import React from "react";
import { Popper, Alert, Collapse, Grid } from "@material-ui/core";
import useStyles from "./AlertsStyles";

const LoginPopup = (props) => {
    const classes = useStyles();

    const { alert, setAlert } = props;

    const [collapse, setCollapse] = useState(false);
    const [login, setLogin] = useState(false);

    return (
        <Popper
            className={classes.root, classes.front, classes.position}
            disablePortal keepMounted anchorEl={document.body}
            open={alert.showAlert} modifiers={{ preventOverflow: { enabled: true, boundariesElement: 'scrollParent' } }}>
            <Alert
                icon={false}
                elevation={0}
                className={classes.front}
                severity={alert.type}>
                <Alert onClose={() => setAlert({ showAlert: false })} style={{ "margin": 0, "padding": 0 }} severity={alert.type}>{alert.message}</Alert>
                {login ? <Collapse in={collapse}>
                    <Grid container justify="center" alignItems="center" classes={{ container: classes.container }} spacing={2}>
                        <Grid item>
                            <Button onClick={() => handleClose("register")}>Sign up</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setLogin(true)}>Login</Button>
                        </Grid>
                    </Grid>
                </Collapse> : <Grid className={classes.container} container><Login alert /></Grid>}
            </Alert>
        </Popper>
    )
}

export default LoginPopup;