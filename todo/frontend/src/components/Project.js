import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.repoUrl}</td>
            <td>{project.user}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>name</th>
            <th>URL</th>
            <th>user</th>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList;
