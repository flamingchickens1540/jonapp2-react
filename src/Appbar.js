import React from "react"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from "@material-ui/core/Dialog";
import useTheme from "@material-ui/core/styles/useTheme";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import QRCode from 'qrcode';


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
    },
    profileButton: {
        marginLeft: 'auto',
        marginRight: '30px'
    },
    profileDrawer: {
        width: '250px',
        right: '0 !important',
        zIndex: '1099 !important',
        inset: 'auto !important',
    },
    extraPaperAnchor: {
        width: '250px',
        top: 0,
        right: 0,
        left: 'initial'
    },
    profileCard: {
        paddingTop: '64px',
        [theme.breakpoints.down('xs')]: {
            paddingTop: '56px',
        }
    },
    avatar: {
        backgroundColor: '#48577d',
        marginLeft: '15px',
        height: '55px',
        width: '55px',
        fontSize: '1.5rem',
    },
    profileInfo: {
        display: 'flex',
        alignItems: 'center',
        height: '100px',
        backgroundColor: '#899bc9',
    },
    userName: {
        fontSize: "1.25rem",
        color: "white",
        marginBottom: '3px',
    },
    userInfo: {
        fontSize: ".9rem",
        color: "white",
    },
    textBox: {
        marginLeft: '15px',
    },
    qrcode: {
        height: '400px',
        width: '400px',
        [theme.breakpoints.down('xs')]: {
            height: '90vw',
            width: '90vw',
        }
    }
}));

//Appbar for all pages of the JonApp.
export default function Appbar(props) {
    const classes = useStyles(); //Import styles from above.

    //Manage the QR Code dialog appearance state.
    const [open, setOpen] = React.useState(false);
    //Manage the data of the user QR code in state. Only has to be set once.
    const [QRurl, setQRUrl] = React.useState(null);

    const theme = useTheme(); //Use themes for dialog breakpoints.
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); //Uses a media query to fullscreen dialog box.

    const qrGen = () => { //Function for generating the user's QR code. Needs to be implemented with actual user data.
        QRCode.toDataURL('UserIDTest')
            .then(url => {
                setQRUrl(url); //Change the state value to the b64 QR code.
            })
            .catch(err => {
                console.error(err) //Needs better error handling, but should rarely throw anyways.
            })
    };

    const handleClickOpen = () => { //Handle opening the QR dialog.
        setOpen(true);
    };

    const handleClose = () => { //Handle closing the QR dialog.
        setOpen(false);
    };

    const [state, setState] = React.useState({ //Terribly named, but the state for toggling profile drawer.
        top: false, //Top anchor begins hidden. :)
    });

    const toggleDrawer = (anchor, open) => (event) => { //Toggle the drawer open or closed, given the anchor.
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return; //Makes sure you can't tab out, but can tab through.
        }

        setState({ ...state, [anchor]: open }); //Set that anchor to open baby!
    };

    const list = (anchor) => ( //This is the list displayed by the drawer. Contains user info.
        <div
            className={classes.profileCard}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)} ---- Should it close when you click?
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box className={classes.profileInfo}>
                <Avatar className={classes.avatar}>SK</Avatar>
                <Box className={classes.textBox}>
                    <Typography variant="h5" className={classes.userName} >
                        Seth Knights
                    </Typography>
                    <Typography variant="h2" className={classes.userInfo} >
                        sethtest@test.org
                    </Typography>
                </Box>
            </Box>
            <List>
                <ListItem button key={'My Account'}>
                    <ListItemText primary={'My Account'} />
                </ListItem>
                <ListItem button key={'QR Code'}>
                    <ListItemText primary={'QR Code'} onClick={handleClickOpen} />
                </ListItem>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Your QR Code"}</DialogTitle>
                    <DialogContent>
                        {qrGen()}
                        <img src={QRurl} className={classes.qrcode} alt="qr code" />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </List>

        </div>
    );

    //Returns the long appbar with JonApp logo, with back button and profile drawer when indicated by props.
    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar style={{alignItems: 'center', width: '100%'}}>
                <Typography component={ Link } to="/" variant="h4" color="inherit" className={classes.logo}>
                    JonApp
                </Typography>
                {props.back ?
                <IconButton aria-label="back to previous page" color="inherit" className={classes.backButton} onClick={() => {
                    window.history.back()
                }}>
                    <ArrowBackIcon />
                </IconButton> : null}
                {props.profile ?
                <IconButton aria-label="back to previous page" color="inherit" className={classes.profileButton} onClick={toggleDrawer('top', !state['top'])}>
                    <AccountCircleIcon />
                </IconButton> : null }

                {props.profile ? <Drawer classes={{paperAnchorTop: classes.extraPaperAnchor }} anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)} className={classes.profileDrawer}>
                    {list('top')}
                </Drawer> : null }
            </Toolbar>
        </AppBar>
    )
}

