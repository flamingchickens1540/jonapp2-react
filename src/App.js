import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Splash from "./Splash"
import Appbar from "./Appbar";
import Entrance from "./Entrance";


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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
