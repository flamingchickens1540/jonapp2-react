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
    TextareaAutosize,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SimpleMenu from "./simpleMenu";
import {Field, Form, Formik} from "formik";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    projectCard: {
        margin: '20px',
    },
    projectCardContent: {
        maxHeight: '100px',
        minHeight: '100px',
        textOverflow: 'ellipsis',
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
        },
    },
    formButtons: {
        alignSelf: 'center',
        paddingTop: '10px'
    },
    contentForm: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
}));

export default function ProjectCard(props) {
    const classes = useStyles();

    const [editBool, setEditBool] = useState(props.form);
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
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.projectCard}>
                {editBool ?
                    <ClickAwayListener onClickAway={props.form ? null : handleEdit}>
                        <Box>
                            <Formik
                                initialValues={{ name: props.project.name, description: props.project.description, image: ''}}
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
                                            <Box className={classes.formImage}>
                                                <input id="image" name="image" type="file" onChange={(event) => {
                                                    setFieldValue("image", event.currentTarget.files[0], false)
                                                    handleImageUpdate(event);
                                                }} style={{display: 'none'}} />
                                                <IconButton aria-label="add image" component='label' htmlFor="image" className={classes.imageInputButton}>
                                                    <PhotoCameraIcon />
                                                </IconButton>
                                                <CardMedia
                                                    component="img"
                                                    src={formImageVal == null ? props.project.image === '' ? 'https://cdn.discordapp.com/attachments/473705436793798676/696918972771074068/Untitled_drawing_3.png' : props.subtask.image : formImageVal}
                                                    alt="Task Image"
                                                    height="270"
                                                />
                                            </Box>
                                            <CardContent className={classes.contentForm}>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    label="Task Name"
                                                    placeholder="Task Name"
                                                    className={classes.taskInputTitle + ' MuiTypography-gutterBottom MuiTypography-h5'}
                                                />
                                                <Field
                                                    type="text"
                                                    as={ TextareaAutosize }
                                                    maxLength="140"
                                                    name="description"
                                                    label="Task Description"
                                                    placeholder="Task Description (Max. 140 Char)"
                                                    className={classes.taskInputDesc + ' MuiTypography-colorTextSecondary MuiTypography-body2'}
                                                />
                                                <ButtonGroup
                                                    orientation="horizontal"
                                                    aria-label="horizontal outlined button group"
                                                    className={classes.formButtons}
                                                >
                                                    <Button type="submit">Save</Button>
                                                    <Button onClick={props.form ? props.handleAddTask : handleEdit}>Cancel</Button>
                                                </ButtonGroup>
                                            </CardContent>
                                        </Form>
                                )}
                            </Formik>
                        </Box>
                    </ClickAwayListener>
                :
                    <Box>
                        <CardActionArea component={ Link } to={"/projects/" + props.project.id}>
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
                                <SimpleMenu handleEdit={handleEdit} handleDelete={props.handleChange} id={props.project.id} type="project" />
                            </Box>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.project.description}
                            </Typography>
                        </CardContent>
                    </Box>
                }
            </Card>
        </Grid>
    )
}
