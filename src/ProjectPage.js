import React, {useEffect, useState} from "react"
import ProjectGrid from "./ProjectGrid";

export default function ProjectPage() {
    const [projects, setProjects] = useState(null)

    const handleChange = (id, type) => {
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
        setProjects() //Set this to something!)
    }, []);


    return(
        <ProjectGrid
            projects={[{id: 10, name: 'Project Test', description: 'Here is a test description', image: ''}]} //replace this with the projects var when necessary
            handleChange={handleChange}
        />
    )
}