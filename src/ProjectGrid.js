import React, {useEffect, useState} from "react";
import {Box, Container, Fab, Grid, Paper, Typography,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add"
import ProjectCard from "./ProjectCard";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    offsetContainer: {
        paddingTop: '64px',
    },
    projectContainer: {
        color: 'black',
        backgroundColor: '#c7d7ff',
        padding: '20px',
        marginTop: '40px',
    },
    title: {
        fontFamily: 'open-sans, sans-serif',
        fontWeight: 500,
        fontStyle: 'normal',
        paddingBottom: '20px'
    },
    addButton: {
        color: 'white',
        marginLeft: '20px',
        backgroundColor: '#2DC8B8',
        "&:hover": {
            backgroundColor: '#59D9CC',
        }
    }

}));

export default function ProjectGrid(props) {
    const classes = useStyles();

    const [ fadeBool, setFadeBool ] = useState(false);
    const [ isAddingProject, setIsAddingProject ] = useState(false);

    useEffect(() => {
        setFadeBool(true)
    }, [fadeBool]);

    const handleAddProject = (isPosted) => {
        if (isPosted) {
            props.handleChange('add');
            setIsAddingProject(prevState => {
                return (
                    !prevState
                )
            })
        } else {
            setIsAddingProject(prevState => {
                return (
                    !prevState
                )
            })
        }

    };

    let projectGrid = '';
    console.log(props.projects, 'PROJECTS');

    if (props.projects !== []) {
        projectGrid = props.projects.map(project => {
            return (
                <ProjectCard
                    project={project}
                    key={project['_id']}
                    handleChange={props.handleChange}
                />
            )
        })
    }

    const addProjectForm = (
        <ProjectCard
            project={{id: 0, name: '', description: '', image: ''}}
            form={true}
            handleAddProject={handleAddProject}
        />
    );

    return (
        <div className={classes.root}>
            <Fade in={fadeBool} timout={1000}>
                <Container className={classes.offsetContainer}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper className={classes.projectContainer}>
                                <Grid container>
                                    <Grid item xs={12} style={{padding: ' 0px 20px'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Box display="flex" justifyContent="flex-start" flexGrow="1">
                                                <Fab aria-label="add" className={classes.addButton} onClick={isAddingProject ? null : handleAddProject}>
                                                    <AddIcon/>
                                                </Fab>
                                            </Box>
                                            <Box flexGrow="2" textAlign="center">
                                                <Typography variant="h2" className={classes.title}>
                                                    Projects
                                                </Typography>
                                            </Box>
                                            <Box flexGrow="1">
                                                <Fab style={{visibility: 'hidden'}}>
                                                    <AddIcon/>
                                                </Fab>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    {isAddingProject ? addProjectForm : null}
                                    {projectGrid}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Fade>
        </div>
    )
}