import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ 
    headerWrapper: {
        width: "100%",
        height: "4rem",
        position: "fixed",
        zIndex: 1,
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 5px 5px -2px rgba(0,0,0,0.1)",
        MozBoxShadow: "0px 5px 5px -2px rgba(0,0,0,0.1)",
        WebkitBoxShadow: "0px 5px 5px -2px rgba(0,0,0,0.1)"
    },
    closeIcon: {
        height: "100%",
        marginLeft: "1rem",
        fontSize: "large"
    },
    header: {
        margin: theme.spacing(0, 4)
    },
    listWrapper: {
        position: "relative",
        height: "calc(100% - 13rem)",
        top: "4rem",
        width: "30rem",
        overflowY: "auto"
    },

}))

export default useStyles;