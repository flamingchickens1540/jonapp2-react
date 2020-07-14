import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    ClickAwayListener,
    IconButton,
    Typography
} from "@material-ui/core";
import SimpleMenu from "./simpleMenu";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Field, Form, Formik} from "formik";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

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
        justifyContent: 'flex-start',
        width: '100%',
        height: '80px'
    },
    formImage: {
        filter: 'grayscale(100%)',
        opacity: '0.4',
        display: 'flex',
        alignItems: 'center',
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

export default function SubTaskCard(props) {
    const classes = useStyles();

    const [editBool, setEditBool] = useState(false)
    const [ formImageVal, setFormImageVal ] = useState(null);

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
        <Box flexGrow="1">
            <Card className={classes.subTaskCard}>
                <Box className={classes.subDetails}>
                    {editBool ?
                        <ClickAwayListener onClickAway={handleEdit}>
                            <Box className={classes.subActionArea}>
                                <Formik
                                    initialValues={{ name: props.subtask.name, description: props.subtask.description, image: ''}}
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
                                            <Box className={classes.subActionArea}>
                                                <Box className={classes.formImage}>
                                                    <input id="image" name="image" type="file" onChange={(event) => {
                                                        setFieldValue("image", event.currentTarget.files[0], false)
                                                        handleImageUpdate(event);
                                                    }} style={{display: 'none'}} />
                                                    <IconButton aria-label="add image" component='label' htmlFor="image" className={classes.imageInputButton}>
                                                        <PhotoCameraIcon />
                                                    </IconButton>
                                                    <CardMedia
                                                        className={classes.subTaskImage}
                                                        component="img"
                                                        src={formImageVal == null ? props.subtask.image === '' ? 'https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png' : props.subtask.image : formImageVal}
                                                        alt="Task Image"
                                                        height="120"
                                                    />
                                                </Box>
                                                <CardContent className={classes.contentForm}>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        label="Task Name"
                                                        className={classes.taskInputTitle + ' MuiTypography-h5'}
                                                    />
                                                    <Field
                                                        type="text"
                                                        name="description"
                                                        label="Task Description"
                                                        className={classes.taskInputDesc + ' MuiTypography-colorTextSecondary MuiTypography-body2'}
                                                    />
                                                </CardContent>
                                                <ButtonGroup
                                                    orientation="vertical"
                                                    aria-label="vertical outlined button group"
                                                    className={classes.formButtons}
                                                >
                                                    <Button type="submit">Save</Button>
                                                    <Button onClick={() => {
                                                        handleEdit();
                                                    }}>Cancel</Button>
                                                </ButtonGroup>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </ClickAwayListener>
                        :
                        <CardActionArea className={classes.subActionArea}>
                            <CardMedia
                                className={classes.subTaskImage}
                                component="img"
                                image="https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png"
                                alt="Task Image"
                                height="80"
                            />
                            <CardContent className={classes.content}>
                                <Typography variant="h5" component="h2">
                                    {props.subtask.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.subtask.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>}
                    <div style={{alignSelf: 'center', paddingRight: '5px'}}>
                        {editBool ? null :
                        <SimpleMenu handleEdit={handleEdit} handleDelete={props.handleChange} id={props.subtask.id} type="subtask" />}
                    </div>
                </Box>
            </Card>
        </Box>
    )
}