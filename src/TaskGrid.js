import React, {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Fade from "@material-ui/core/Fade";
import {Box, Container, Fab, Grid, Paper, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TaskCard from "./TaskCard";

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

export default function TaskGrid(props) {
    const classes = useStyles();

    const [ fadeBool, setFadeBool ] = useState(false);
    const [ isAddingTask, setIsAddingTask ] = useState(false);

    useEffect(() => {
        setFadeBool(true)
    }, [fadeBool]);

    const taskGrid = props.project.tasks.map(task => {
        return (
            <TaskCard
                task={task}
                key={task.id}
                handleChange={props.handleChange}
                form={false}
            />
        )
    });

    const handleAddTask = () => {
        setIsAddingTask(prevState => {
            return (
                !prevState
            )
        })
    };

    const addTaskForm = (
            <TaskCard
                task={{id: 0, name: '', description: '', image: ''}}
                form={true}
                handleAddTask={handleAddTask}
            />
    )

    return (
        <div className={classes.root}>
            <Appbar/>
            <Fade in={fadeBool} timout={1000}>
                <Container className={classes.offsetContainer}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper className={classes.projectContainer}>
                                <Grid container>
                                    <Grid item xs={12} style={{padding: '0px 20px'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Box display="flex" justifyContent="flex-start" flexGrow="1">
                                                <Fab aria-label="add" className={classes.addButton} onClick={isAddingTask ? null : handleAddTask}>
                                                    <AddIcon/>
                                                </Fab>
                                            </Box>
                                            <Box flexGrow="2" textAlign="center">
                                                <Typography variant="h2" className={classes.title}>
                                                    Tasks
                                                </Typography>
                                            </Box>
                                            <Box flexGrow="1">
                                                <Fab style={{visibility: 'hidden'}}>
                                                    <AddIcon/>
                                                </Fab>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    {isAddingTask ? addTaskForm : null}
                                    {taskGrid}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Fade>
        </div>
    )

}