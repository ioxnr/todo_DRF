import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/User";
import axios from 'axios';
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {HashRouter, BrowserRouter, Route, Switch, Link} from "react-router-dom";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import NotFound404 from "./components/NotFound404";
import ProjectTodoList from "./components/ProjectDetail";
import LoginForm from "./components/LoginForm";
import Cookies from "universal-cookie/lib";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(
            response => {
                this.set_token(response.data['token'])
            }
        ).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({users: []})
        })

        axios.get('http://127.0.0.1:8000/api/projects', {headers}).then(
            response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => {
            console.log(error)
             this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todo', {headers}).then(
            response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }
        ).catch(error => {
            console.log(error)
             this.setState({todos: []})
        })
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        // console.log(this.state.token)
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage();
    }

    render() {
        return (
            <body>
            <div className="wrapper">
                <BrowserRouter>
                    <Menu is_auth={this.is_auth.bind(this)} logout={() => {
                        this.logout()
                    }}/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
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
