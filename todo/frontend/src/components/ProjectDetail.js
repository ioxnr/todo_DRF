import React from 'react';
import {useParams} from 'react-router-dom';
import Moment from "moment";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.user}</td>
            <td>{Moment(todo.created).format('DD:MM:YYYY HH:mm:ss')}</td>
            <td>{Moment(todo.updated).format('DD:MM:YYYY HH:mm:ss')}</td>
            <td>{todo.isActive ? 'Yes' : 'No'}</td>
        </tr>
    )
}

const ProjectTodoList = ({todos}) => {

    let {id} = useParams();
    let filtered_items = todos.filter((todo) => todo.projectId === (parseInt(id)));

    return (
        <table>
            <tr>
                <th>id</th>
                <th>text</th>
                <th>creator</th>
                <th>created</th>
                <th>updated</th>
                <th>is active</th>
            </tr>
            {filtered_items.map((todo) => <TodoItem key={todo.id} item={todo}/>)}
        </table>
    )
}

export default ProjectTodoList;