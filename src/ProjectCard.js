import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SimpleMenu from "./simpleMenu";

const useStyles = makeStyles((theme) => ({
    projectCard: {
        margin: '20px',
    },
    projectCardContent: {
        maxHeight: '100px',
        minHeight: '100px',
        textOverflow: 'ellipsis',
    },
}));

export default function ProjectCard(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.projectCard}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Project Image"
                        height="270"
                        image={props.project.image === '' || null ? 'https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png' : props.project.image}
                    />
                </CardActionArea>
                <CardContent className={classes.projectCardContent}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="h2">
                            {props.project.name}
                        </Typography>
                        <SimpleMenu handleChange={props.handleChange} id={props.project.id} type="project" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.project.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
