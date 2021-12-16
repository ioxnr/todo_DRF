import React from 'react';
import {Link} from "react-router-dom";

const Menu = ({is_auth, logout}) => {
    return (
        <div className="header">
            <nav>
                <Link to='/'>Users</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/todo'>ToDo list</Link>
                {is_auth() ? <Link onClick={() => {logout()}}>Logout</Link> : <Link to='/login'>Login</Link>}
            </nav>
        </div>
    )
}

export default Menu;
