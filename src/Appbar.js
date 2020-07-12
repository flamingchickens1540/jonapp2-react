import React from "react"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import { Link } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    appbar: {
        background: '#48577d',
    },
    logo: {
        color: 'white',
        fontWeight: 300,
        fontStyle: 'normal',
        fontFamily: 'open-sans, sans-serif',
        textDecoration: 'none',
    },
}));

export default function Appbar(props) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
                <Typography component={ Link } to="/" variant="h4" color="inherit" className={classes.logo}>
                    JonApp
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

