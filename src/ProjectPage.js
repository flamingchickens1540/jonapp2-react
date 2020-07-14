import React, {useEffect, useState} from "react"
import ProjectGrid from "./ProjectGrid";
import TaskGrid from "./TaskGrid"
import {Route, Switch, useRouteMatch} from "react-router-dom";

export default function ProjectPage() {
    let match = useRouteMatch();

    const [projects, setProjects] = useState(null)

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
        setProjects() //Set this to something!
    }, []);


    return(
        <Switch>
            <Route path={`${match.path}/:projectId`}>
                <TaskGrid
                    project={{id: 10, name: 'Project Test', description: 'Here is a test description', image: '', tasks: [{id: 1, name: 'Do the dirty dishes', description: 'Please pickup your dishes and put them in the dishwasher.', image: '', subtasks: [{id: 2, name: 'Sub-task', description: 'Sub-task description.', image: ''}, {id: 3, name: 'Sub-task', description: 'Sub-task description.'}] }] }}
                    handleChange={handleChange}
                />
            </Route>
            <Route path={match.path}>
                <ProjectGrid
                    projects={[{id: 10, name: 'Project Test', description: 'Here is a test description', image: ''}]} //replace this with the projects var when necessary
                    handleChange={handleChange}
                />
            </Route>
        </Switch>
    )
}