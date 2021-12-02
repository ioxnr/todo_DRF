import React from "react";
import Moment from 'moment';

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.projectId}</td>
            <td>{todo.text}</td>
            <td>{Moment(todo.created).format('DD:MM:YYYY HH:mm:ss')}</td>
            <td>{Moment(todo.updated).format('DD:MM:YYYY HH:mm:ss')}</td>
            <td>{todo.userId}</td>
            <td>{todo.isActive ? 'Yes' : 'No'}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>project</th>
            <th>text</th>
            <th>date created</th>
            <th>date updated</th>
            <th>creator</th>
            <th>is active</th>
            {todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}
export default TodoList;
