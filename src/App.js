import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Splash from "./Splash"
import Appbar from "./Appbar";
import Entrance from "./Entrance";
import ProjectPage from "./ProjectPage";
import {setCookie} from "./utils";

//Central component. Handles login/signup api requests, but hands off project and user data to the ProjectPage.
function App() {

    //Function for taking login form values and sending request to receive auth token.
    function login(values) {
        console.log(JSON.stringify(values));

        const url = 'http://localhost:5001/login';
        fetch(url, {method: 'POST', body: JSON.stringify(values), headers: {
                'Content-Type': 'application/json',
            },})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCookie('AUTH_TOKEN', data.data)
            })
            .catch(error => console.log(error))
    }

    //Function for taking signup form values and sending request to receive auth token.
    function signup(values) {
        console.log(values);

        const url = 'http://localhost:5001/signup';
        fetch(url, {method: 'POST', body: JSON.stringify(values), headers: {
                'Content-Type': 'application/json',
            },})
            .then(response => response.json())
            .then(data => console.log(data));
    }


    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Appbar back={false}/>
                        <Splash/>
                    </Route>
                    <Route path="/login">
                        <Entrance
                            formChoices={[
                                {name: 'email', label: 'Email', type: 'email'},
                                {name: 'password', label: 'Password', type: 'password'},
                            ]}
                            buttonText="Sign In"
                            mainText="Sign In"
                            formType="login"
                            submitHandler={login}
                        />
                    </Route>
                    <Route path="/signup">
                        <Entrance
                            formChoices={[
                                {name: 'name', label: 'Full Name', type: 'text'},
                                {name: 'email', label: 'Email', type: 'email'},
                                {name: 'password', label: 'Password', type: 'password'},
                                {name: 'confirmpassword', label: 'Confirm Password', type: 'password'}
                            ]}
                            buttonText="Create Account"
                            mainText="Sign Up"
                            formType="signup"
                            submitHandler={signup}
                        />
                    </Route>
                    <Route path="/projects"> {/*The projects path is handled by the ProjectPage component, which also routes any url params.*/}
                        <ProjectPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

//https://github.com/TeamWertarbyte/material-ui-feature-discovery-prompt just to help me remember where to look when we implement feature discovery.

export default App;
