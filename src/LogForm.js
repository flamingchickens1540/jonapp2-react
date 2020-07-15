import React from 'react';
import {Field, Form, Formik} from 'formik';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

export default function LogForm(props) {
    const classes = useStyles();



    let initVals = {};
    for (let i = 0; i < props.formChoices.length; i++) {
        initVals[props.formChoices[i]['name']] = ''
    }


    let formItems;
    return (
        <Formik
            initialValues={initVals}
            validate={values => {
                const errors = {};

                if (props.formType === 'signup') {
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
                        { formItems = props.formChoices.map(item => {
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