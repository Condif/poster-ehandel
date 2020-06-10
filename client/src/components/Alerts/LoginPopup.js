import React, { useState, useEffect, useContext, forwardRef } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./AlertsStyles";
import Login from "../Login/Login";
import { UserContext } from "../../Contexts/UserContext";
import Fade from "@material-ui/core/Fade";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';


const LoginPopup = forwardRef((props, ref) => {
    const classes = useStyles();
    const history = useHistory();
    
    const { setLoginPopup, loginPopup } = useContext(UserContext)

    const [mode, setMode] = useState({
        login: false,
        collapse: false
    });

    useEffect(() => {
        setTimeout(() => {
            setMode({ login: false, collapse: true });
        }, 900);
    }, [loginPopup])

    const handleLoginButton = () => {
        setMode({ login: false, collapse: false });
        setTimeout(() => {
            setMode({ login: true, collapse: true });
        }, 600);
    }

    const handleClose = (type) => {
        setLoginPopup({ showLogin: false, message: null });
        history.push(`/${type}`);
    }

    return (
        <Fade in={loginPopup.showLogin} timeout={1000}>
            <div className={classes.root}>
                <Alert
                    ref={ref}
                    open={loginPopup.showLogin}
                    icon={false}
                    elevation={0}
                    severity={"info"}>
                    <Alert onClose={() => setLoginPopup({ showLogin: false, message: null })} style={{ "margin": 0, "padding": 0 }} severity="info">{loginPopup.message}</Alert>
                    {mode.login ?
                        <Collapse in={mode.collapse && mode.login}><Grid className={(classes.container, classes.white)} container><Login /></Grid></Collapse> :
                        <Collapse in={mode.collapse && !mode.login}>
                            <Grid container justify="center" alignItems="center" classes={{ container: classes.container, item: classes.buttons }} spacing={2}>
                                <Grid item>
                                    <Button color="secondary" style={{ "color": "white" }} variant="contained" onClick={() => handleClose("register")}>Sign up</Button>
                                </Grid>
                                <Grid item>or</Grid>
                                <Grid item>
                                    <Button color="secondary" style={{ "color": "white" }} variant="contained" onClick={handleLoginButton}>Login</Button>
                                </Grid>
                            </Grid>
                        </Collapse>}
                </Alert>
            </div>
        </Fade>
    )
})

export default LoginPopup;