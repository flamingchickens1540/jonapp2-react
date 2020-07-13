import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Splash from "./Splash"
import Appbar from "./Appbar";
import Entrance from "./Entrance";
import ProjectPage from "./ProjectPage";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Appbar/>
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
                        />
                    </Route>
                    <Route path="/signup">
                        <Entrance
                            formChoices={[
                                {name: 'fullName', label: 'Full Name', type: 'text'},
                                {name: 'email', label: 'Email', type: 'email'},
                                {name: 'password', label: 'Password', type: 'password'},
                                {name: 'confirmpassword', label: 'Confirm Password', type: 'password'}
                            ]}
                            buttonText="Create Account"
                            mainText="Sign Up"
                        />
                    </Route>
                    <Route path="/projects">
                        <ProjectPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

//https://github.com/TeamWertarbyte/material-ui-feature-discovery-prompt

export default App;
