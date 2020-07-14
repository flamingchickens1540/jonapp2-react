import React, {useState} from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    ClickAwayListener,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SimpleMenu from "./simpleMenu";
import SubTaskCard from "./SubTaskCard";
import {Field, Form, Formik} from 'formik';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    taskCard: {
        margin: '20px',
        height: '120px',
        background: 'white',
        display: 'flex',
    },
    taskImage: {
        width: '200px',
    },
    content: {
        alignSelf: 'center',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    actionArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        height: '120px'
    },
    subTaskFlex: {
        display: 'flex',
        flexDirection: 'column'
    },
    contentForm: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '70%'
    },
    taskInputTitle: {
        border: 'none',
        borderBottom: '2px solid black',
        padding: '0px',
        width: '100%',
    },
    taskInputDesc: {
        border: 'none',
        borderBottom: '2px solid grey',
        padding: '0px',
        width: '100%',
    },
    formButtons: {
        alignSelf: 'center',
    },
    formImage: {
        filter: 'grayscale(100%)',
        opacity: '0.4',
        display: 'flex',
        alignItems: 'center',
    },
    imageInputButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
        backgroundColor: '#EBEBEB',
        "&:hover": {
            backgroundColor: 'white',
        }
    }
}));

export default function TaskCard(props) {
    const classes = useStyles();

    const [ dispBool, setDispBool ] = useState(false);
    const [ editBool, setEditBool ] = useState(props.form);
    const [ formImageVal, setFormImageVal ] = useState(null);

    const handleClick = () => {
        setDispBool(prevState => {
            return (
                !prevState
            )
        })
    };

    const handleEdit = () => {
        setEditBool(prevState => {
            if (prevState === true) {
                setFormImageVal(null);
                return (
                    !prevState
                )
            } else {
                return (
                    !prevState
                )
            }
        })
    };

    const handleDelete = () => {

    };

    let subTaskGrid;

    if (props.form === false) {
        subTaskGrid = props.task.subtasks.map(subtask => {
            return (
                <SubTaskCard
                    subtask={subtask}
                    handleChange={props.handleChange}
                    key={subtask.id}
                />
            )
        });
    }

    const handleImageUpdate = (event) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            const FR = new FileReader();

            FR.addEventListener("load", function (e) {
                setFormImageVal(e.target.result); // e.target.result is the b64
            });

            FR.readAsDataURL(event.currentTarget.files[0]);
        } else {
            alert("Error uploading image.");
            throw new Error("Error uploading image.");
        }
    };


    return (
        <Grid item xs={12}>
            <Card className={classes.taskCard}>
                <Box className={classes.details}>
                        {editBool ?
                            <ClickAwayListener onClickAway={props.form ? null : handleEdit}>
                                <Box className={classes.actionArea}>
                                    <Formik
                                        initialValues={{ name: props.task.name, description: props.task.description, image: ''}}
                                        validate={values => {
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                alert(JSON.stringify(values, null, 2));
                                                console.log({
                                                    fileName: values.image.name,
                                                    type: values.image.type,
                                                    size: `${values.image.size} bytes`
                                                });
                                                setSubmitting(false);
                                            }, 400);
                                        }}

                                    >
                                        {({ isSubmitting, handleChange, setFieldValue }) => (

                                            <Form style={{width: '100%'}}>
                                                <Box className={classes.actionArea}>
                                                    <Box className={classes.formImage}>
                                                        <input id="image" name="image" type="file" onChange={(event) => {
                                                            setFieldValue("image", event.currentTarget.files[0], false)
                                                            handleImageUpdate(event);
                                                        }} style={{display: 'none'}} />
                                                        <IconButton aria-label="add image" component='label' htmlFor="image" className={classes.imageInputButton}>
                                                            <PhotoCameraIcon />
                                                        </IconButton>
                                                        <CardMedia
                                                            className={classes.taskImage}
                                                            component="img"
                                                            src={formImageVal == null ? props.task.image === '' ? 'https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png' : props.task.image : formImageVal}
                                                            alt="Task Image"
                                                            height="120"
                                                        />
                                                    </Box>
                                                    <CardContent className={classes.contentForm}>
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                            label="Task Name"
                                                            placeholder="Task Name"
                                                            className={classes.taskInputTitle + ' MuiTypography-h5'}
                                                        />
                                                        <Field
                                                            type="text"
                                                            name="description"
                                                            label="Task Description"
                                                            placeholder="Task Description"
                                                            className={classes.taskInputDesc + ' MuiTypography-colorTextSecondary MuiTypography-body2'}
                                                        />
                                                    </CardContent>
                                                    <ButtonGroup
                                                        orientation="vertical"
                                                        aria-label="vertical outlined button group"
                                                        className={classes.formButtons}
                                                    >
                                                        <Button type="submit">Save</Button>
                                                        <Button onClick={props.form ? props.handleAddTask : handleEdit}>Cancel</Button>
                                                    </ButtonGroup>
                                                </Box>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                            </ClickAwayListener>
                            :
                            <CardActionArea className={classes.actionArea} onClick={handleClick}>
                                <Box className={classes.actionArea}>
                                    <CardMedia
                                        className={classes.taskImage}
                                        component="img"
                                        image={props.task.image === '' || null ? 'https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png' : props.task.image}
                                        alt="Task Image"
                                        height="120"
                                    />
                                    <CardContent className={classes.content}>
                                        <Typography variant="h5" component="h2" style={{paddingBottom: '2px'}}>
                                            {props.task.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{paddingBottom: '2px'}}>
                                            {props.task.description}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </CardActionArea>}
                        <div style={{alignSelf: 'center', paddingRight: '5px'}}>
                            {props.form || editBool ? null:
                            <SimpleMenu handleEdit={handleEdit} handleDelete={handleDelete} id={props.task.id} type="task" />}
                        </div>
                </Box>
            </Card>
            <Box className={classes.subTaskFlex} style={{display: dispBool ? 'flex' : 'none'}}>
                {props.form ? null : subTaskGrid}
            </Box>
        </Grid>
    )
}