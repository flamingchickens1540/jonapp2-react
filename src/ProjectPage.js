import React, {useEffect, useState} from "react"
import ProjectGrid from "./ProjectGrid";
import TaskGrid from "./TaskGrid"
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Appbar from "./Appbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getCookie} from "./utils";

//Project page handles state and top level rendering for project and task pages.
export default function ProjectPage() {
    let match = useRouteMatch(); //Allows for using react-router for url params.

    const [projects, setProjects] = useState(null); //State containing object of user projects.
    const [isLoading, setIsLoading] = useState(true); //State for showing loading symbol. Begins true.

    async function updateProjects() {

        const AUTH_TOKEN = getCookie('AUTH_TOKEN'); //Auth token from cookie.
        const url = 'http://localhost:5001/projects'; //Server url for api requests.
        const response = await fetch(url, {method: 'GET', headers: {
                'Authorization': 'Basic ' + AUTH_TOKEN,
            },}) //Fetch function for getting projects.
            .catch(error => console.log(error));

        return response.json();
    }

    const handleChange = (action) => { //This handles editing and deleting. Needs updating and implementation.
        switch(action) { //I think these cases need fixing as well, as the actual function is changed down the line.
            case 'add':
                updateProjects()
                    .then(data => setProjects(data.data));
                break;
            default:
        }

    };

    useEffect(() => { //On mount do this stuff!
        setIsLoading(true); //Make sure loading is true, even though we start it true. lol

        const AUTH_TOKEN = getCookie('AUTH_TOKEN'); //Auth token from cookie.
        const url = 'http://localhost:5001/projects'; //Server url for api requests.
        fetch(url, {method: 'GET', headers: {
                'Authorization': 'Basic ' + AUTH_TOKEN,
            },}) //Fetch function for getting projects.
            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data);
                setProjects(data.data);

                setTimeout(() => setIsLoading(false), 100); //Make the loading symbol last. ;)
            })
            .catch(error => console.log(error)) //Needs better error handling.

    }, []);

    //Loads a project's tasks given the id from the url. Check the to-do below.
    function loadProject() { //TODO: Clean this shit up bc it is not well done and should be using react-router instead
        const toLoad = projects.map(project => {
            let id = window.location.pathname;
            let id2 = id.replace('/projects/', '');

            if ((project['_id']).toString() === id2) {
                console.log(project);
                return project
            } else {
                return null
            }
        });

        if (toLoad[0] !== null) { //Load the project if there is one.
            return (
                <TaskGrid
                    project={toLoad[0]}
                    handleChange={handleChange}
                />
            )
        } else {
            return ( //Return an error if their url doesn't exist. Should probably just redirect, needs improving.
                <h1>Project does not exist</h1>
            )
        }

    }

    return( //Switch that allows for project page loading and then individual project's task pages.
        <Switch>
            <Route exact path={match.path}>
                <Appbar back={false} profile={true} />
                { isLoading ? <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><CircularProgress /></div> :
                    <ProjectGrid
                        projects={projects} //Super cool comment.
                        handleChange={handleChange}
                    />}
            </Route>
            <Route path={`${match.path}/:projectId`}>
                {projects === null ? null : loadProject}
            </Route>
        </Switch>
    )
}