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

    console.log(props.formChoices[1])

        let initVals = {};
        for (let i = 0; i < props.formChoices.length; i++) {
            initVals[props.formChoices[i]['name']] = ''
        }
        console.log(initVals, 'INITIAL');

        const formItems = props.formChoices.map(item => {
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
                    />
                </Grid>
            )
    })

    return (
        <Formik
            initialValues={{ email: '', password: ''}}
            validate={values => {

            }}
            onSubmit={(values, { setSubmitting }) => {

                setTimeout(() => {

                    console.log(values);

                    setSubmitting(false);


                }, 400);

            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Grid container spacing={2}>
                        { formItems }
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