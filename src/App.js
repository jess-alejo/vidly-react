import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import { ToastContainer } from "react-toastify"

import "./App.css"
import Navbar from "./components/common/navbar"
import Movies from "./components/movies"
import MovieForm from "./components/movieForm"
import Customers from "./components/customers"
import Rentals from "./components/rentals"
import NotFound from "./components/notFound"
import LoginForm from "./components/loginForm"
import RegisterForm from "./components/registerForm"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
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
