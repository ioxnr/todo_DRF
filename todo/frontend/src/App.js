import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/User";
import axios from 'axios';
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {HashRouter, BrowserRouter, Route, Switch} from "react-router-dom";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import NotFound404 from "./components/NotFound404";
import ProjectTodoList from "./components/ProjectDetail";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects').then(
            response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo').then(
            response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }
        ).catch(error => console.log(error))
    }

    render() {
        return (
            <body>
            <div className="wrapper">
                <BrowserRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route path='/project/:id'>
                            <ProjectTodoList todos={this.state.todos}/>
                        </Route>
                        <Route component={NotFound404}/>
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            </div>
            </body>
        );
    }
}

export default App;
