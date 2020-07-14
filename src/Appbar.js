import React from "react"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    appbar: {
        background: '#48577d',
        color: 'white'
    },
    logo: {
        color: 'white',
        fontWeight: 300,
        fontStyle: 'normal',
        fontFamily: 'open-sans, sans-serif',
        textDecoration: 'none',
        alignSelf: 'center',
        paddingBottom: '5px'
    },
    backButton: {
        marginLeft: '5px'
    }
}));

export default function Appbar(props) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar style={{alignItems: 'center'}}>
                <Typography component={ Link } to="/" variant="h4" color="inherit" className={classes.logo}>
                    JonApp
                </Typography>
                <IconButton aria-label="back to previous page" color="inherit" className={classes.backButton}>
                    <ArrowBackIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

