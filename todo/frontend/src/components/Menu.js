import React from 'react';
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className="header">
            <nav>
                <Link to='/'>Users</Link>
                <Link to='/projects'>Projects </Link>
                <Link to='/todo'>ToDo list </Link>
            </nav>
        </div>
    )
}

export default Menu;
