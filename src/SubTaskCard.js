import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import SimpleMenu from "./simpleMenu";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    subTaskCard: {
        margin: '20px',
        marginTop: '0px',
        height: '80px',
        background: 'white',
        display: 'flex',
        width: '75%',
        float: 'right'
    },
    subTaskImage: {
        width: '133px'
    },
    subDetails: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    subActionArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

}));

export default function SubTaskCard(props) {
    const classes = useStyles();

    return (
        <Box flexGrow="1">
            <Card className={classes.subTaskCard}>
                <Box className={classes.subDetails}>
                    <CardActionArea className={classes.subActionArea}>
                        <CardMedia
                            className={classes.subTaskImage}
                            component="img"
                            image="https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png"
                            alt="Task Image"
                            height="80"
                        />
                        <CardContent className={classes.content}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.subtask.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.subtask.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <div style={{alignSelf: 'center', paddingRight: '5px'}}>
                        <SimpleMenu handleChange={props.handleChange} id={props.subtask.id} type="subtask" />
                    </div>
                </Box>
            </Card>
        </Box>
    )
}