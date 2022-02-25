import React from "react"
import { Redirect } from "react-router-dom"
import Form from "./common/form"
import Joi from "joi-browser"
import auth from "../services/authService"

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  }

  doSubmit = async () => {
    try {
      const { data } = this.state
      await auth.login(data.email, data.password)
      // this.props.history.push("/")
      const { state } = this.props.location
      window.location = state ? state.from.pathname : "/"
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        const { message: errorMessage } = ex.response.data
        errors["email"] = errorMessage
        this.setState({ errors })
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />

    return (
      <form className="form-login" onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderSubmitButton("Login", "mt-3 px-5")}
      </form>
    )
  }
}

export default LoginForm
