import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Navbar from "./components/common/navbar"
import Movies from "./components/movies"
import MovieForm from "./components/movieForm"
import Customers from "./components/customers"
import Rentals from "./components/rentals"
import NotFound from "./components/notFound"
import LoginForm from "./components/loginForm"
import RegisterForm from "./components/registerForm"
import Logout from "./components/common/logout"
import ProtectedRoute from "./components/common/protectedRoute"

import auth from "./services/authService"

import "react-toastify/dist/ReactToastify.css"
import "./App.css"

class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const user = this.state.user

    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" render={props => <LoginForm {...props} user={user} />} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={user} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

export default App
