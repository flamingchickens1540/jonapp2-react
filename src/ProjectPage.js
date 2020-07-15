import React, {useEffect, useState} from "react"
import ProjectGrid from "./ProjectGrid";
import TaskGrid from "./TaskGrid"
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Appbar from "./Appbar";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ProjectPage() {
    let match = useRouteMatch();

    const [projects, setProjects] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (id, type, action) => {
        switch(type) {
            case 'edit':
                console.log(id)
                break;
            case 'delete':
                console.log(id)
                break;
            default:
        }

    };

    useEffect(() => {
        setIsLoading(true);

        const AUTH_TOKEN = 'auth-token-here';
        const url = 'http://localhost:5001/projects';
        fetch(url, {method: 'POST', body: AUTH_TOKEN})
            .then(response => response.json())
            .then((data) => {
                setProjects([data.detail]);
                console.log(data);
                setIsLoading(false);
            } )

    }, []);

    function loadProject() { //TODO: Clean this shit up bc it is not well done and should be using react-router instead
        const toLoad = projects.map(project => {
            let id = window.location.pathname;
            let id2 = id.replace('/projects/', '');

            if ((project.id).toString() === id2) {
                return project
            } else {
                return null
            }
        });

        if (toLoad[0] !== null) {
            return (
                <TaskGrid
                    project={toLoad[0]}
                    handleChange={handleChange}
                />
            )
        } else {
            return (
                <h1>Project does not exist</h1>
            )
        }

    }

    return(
        <Switch>
            <Route exact path={match.path}>
                <Appbar back={false} />
                { isLoading ? <CircularProgress style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/> :
                    <ProjectGrid
                        projects={projects} //replace this with the projects var when necessary
                        handleChange={handleChange}
                    />}
            </Route>
            <Route path={`${match.path}/:projectId`}>
                {projects === null ? null : loadProject()}
            </Route>
        </Switch>
    )
}