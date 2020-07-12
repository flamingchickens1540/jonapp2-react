import React, {useEffect, useState} from "react"
import LogForm from "./LogForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles((theme) => ({
   root: {
       height: '100vh',
   },
   offsetContainer: {
       paddingTop: '64px',
       height: '100%',
   },
   formPaper: {
       padding: '20px',
       borderRadius: '15px',
       background: '#c7d7ff',
   },
   formTitle: {
       fontFamily: 'open-sans, sans-serif',
       fontWeight: 300,
       paddingBottom: '15px',
       textAlign: 'center',
   }
}));

export default function Entrance(props) {
    const classes = useStyles();
    const [ fadeBool, setFadeBool ] = useState(false);

    useEffect(() => {
       setFadeBool(true)
       return () => setFadeBool(false)
    }, [fadeBool]);

    return (
        <div className={classes.root}>
            <Appbar />
            <Fade in={fadeBool} timeout={1000}>
                <Grid container justify="center" alignContent="center" className={classes.offsetContainer}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Container>
                            <Paper elevation={3} className={classes.formPaper}>
                                <Typography variant="h2" className={classes.formTitle}>
                                    {props.mainText}
                                </Typography>
                                <LogForm formChoices={props.formChoices} buttonText={props.buttonText}/>
                            </Paper>
                        </Container>
                    </Grid>
                </Grid>
            </Fade>
        </div>

    )
}