import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    title: {
        color: 'white',
        fontWeight: 300,
        fontStyle: 'normal',
        fontSize: '16vw',
        fontFamily: 'open-sans, sans-serif',
        textAlign: 'center',
    },
    subtitle: {
        color: 'white',
        fontWeight: 300,
        fontStyle: 'italic',
        fontSize: '2vw',
        fontFamily: 'open-sans, sans-serif'
    },
    splashButton: {
        color: 'white',
        backgroundColor: '#48577d',
        "&:hover": {
            backgroundColor: '#6476A6',
        }
    },
    aboutCard: {
        color: 'white',
        backgroundColor:'#424242',
        minWidth: 275,
        maxWidth: 275,
    },
    aboutCardTitle: {
        color: 'lightgray',
        fontSize: '14px',
    },
    aboutCardMain: {
        color: 'white',
        fontSize: '12px',
        marginBottom: 0,
    },
    aboutBox: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
    },
    learnButton: {
        color: '#212121'
    }
}));


export default function Splash(props) {
    const classes = useStyles();
    const [ fadeBool, setFadeBool ] = useState(false);


    useEffect(() => {
        setFadeBool(true)
    }, [fadeBool]);

    return (
       <div className={classes.root}>
           <Fade in={fadeBool} timeout={1000}>
               <Container>
                   <Grid container justify="center" style={{paddingTop: '64px'}}>
                       <Grid item xs={12} className={classes.logoContainer}>
                           <Box display="flex" flexDirection="column" alignItems="center" justify="center">
                               <Typography className={classes.title}>
                                   JonApp
                               </Typography>
                               <Typography className={classes.subtitle}>
                                   Revolutionizing employment for those with cognitive disabilities.
                               </Typography>
                           </Box>
                       </Grid>
                       <Grid item xs={12} style={{paddingTop: '30px'}}>
                           <Box display="flex" justifyContent="space-evenly">
                               <Button component={ Link } to="/login" variant="contained" size="large" endIcon={<VpnKeyIcon />} className={classes.splashButton}>Log In</Button>
                               <Button component={ Link } to="/signup" variant="contained" size="large" endIcon={<AssignmentIcon />} className={classes.splashButton}>Sign Up</Button>
                           </Box>
                       </Grid>
                   </Grid>
               </Container>
           </Fade>
           {/*<Box display="flex" justifyContent="flex-end" className={classes.aboutBox}>*/}
           {/*    <Card className={classes.aboutCard}>*/}
           {/*        <CardContent style={{paddingBottom: 0}}>*/}
           {/*            <Box display="flex" flexDirection="column" alignContent="center">*/}
           {/*                <Typography className={classes.aboutCardTitle} gutterBottom>*/}
           {/*                    About JonApp*/}
           {/*                </Typography>*/}
           {/*                <Typography paragraph variant="body2" className={classes.aboutCardMain}>*/}
           {/*                    Originally created by the Catlin Gabel InvenTeam. Now built and maintained by Nate Sales and Seth Knights.*/}
           {/*                </Typography>*/}
           {/*            </Box>*/}
           {/*            <CardActions style={{paddingLeft: 0}}>*/}
           {/*                <Button size="small" variant="contained" className={classes.learnButton}>Learn More</Button>*/}
           {/*             </CardActions>*/}
           {/*        </CardContent>*/}
           {/*    </Card>*/}
           {/*</Box>*/}
       </div>
    )
}