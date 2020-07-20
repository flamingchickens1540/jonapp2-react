import React from 'react';
import {Field, Form, Formik} from 'formik';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

//Styles for below components.
const useStyles = makeStyles((theme) => ({
    inputField: {
        padding: '10px',
    },
    submitButton: {
        color: 'white',
        backgroundColor: '#48577d',
        "&:hover": {
            backgroundColor: '#6476A6',
        }
    },

}));

//Component that handles login/signup in rendering physical boxes and passing data back through Formik to the App component.
export default function LogForm(props) {
    const classes = useStyles(); //Use styles from above.

    let initVals = {}; //Represents and object with the initial variables needed for each field of the form.
    for (let i = 0; i < props.formChoices.length; i++) { //Loops through all formChoices to add an key and value to initVals.
        initVals[props.formChoices[i]['name']] = ''
    }
    initVals['type'] = ''; //We use account type for signup, need to define this for the field to work right.

    let formItems; //I think IntelliJ is weird, however have to define this to show the form items below.
    return (
        <Formik
            initialValues={initVals} //Set initial values.
            validate={values => { //Validation, currently needs more functions, but it works!
                const errors = {};

                if (props.formType === 'signup') { //For signup, the passwords must match.
                    if (values.confirmpassword !== values.password) {
                        errors.confirmpassword = 'Passwords must match'
                    }
                }
                return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                props.submitHandler(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, touched, errors }) => (
                <Form>
                    <Grid container spacing={2}>
                        {props.formType === 'signup' ?
                            <Grid item xs={12}>

                                <Field
                                    as={ TextField }
                                    select
                                    id="select"
                                    required
                                    label="Account Type"
                                    name="type"
                                    variant="outlined"
                                    fullWidth
                                    // style={{paddingLeft: }}
                                >
                                    <MenuItem value="supervisor">Supervisor</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Field>
                            </Grid> : null}
                        { formItems = props.formChoices.map(item => { //Map form choices to a field
                            // let req;
                            // item.required ? req = 'required' : null; TODO: need to figure out how to implement required

                            return (
                            <Grid item xs={12}>
                                <Field
                                    as={ TextField }
                                    required
                                    name={item.name}
                                    type={item.type}
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                    error={
                                        Boolean(errors[item.name] && touched[item.name])
                                        //Only show errors once the field has been touched for the first time.
                                    }
                                    helperText={errors[item.name] && touched[item.name] ? errors[item.name] : null}
                                />
                            </Grid>
                            )
                        }) }
                        <Grid item xs={12}>
                            <Button type="submit"
                                    variant="contained"
                                    className={classes.submitButton}
                            >
                                {props.buttonText}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>

    );

};