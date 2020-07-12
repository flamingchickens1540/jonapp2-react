import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true"
                                    onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={(event) => props.handleChange(props.project.id, 'edit')}>
                                <Box display="flex" alignItems="center">
                                    <EditIcon style={{paddingRight: '10px', fontSize: '1.2rem'}}/>
                                    Edit
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={(event) => props.handleChange(props.project.id, 'delete')}>
                                <Box display="flex" alignItems="center">
                                    <DeleteIcon style={{paddingRight: '10px', fontSize: '1.2rem'}}/>
                                    Delete
                                </Box>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.project.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
