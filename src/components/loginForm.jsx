import React from "react"
import Form from "./common/form"
import Joi from "joi-browser"
import { login } from "../services/authService"
import { toast } from "react-toastify"

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
      const { data: auth } = await login(data.email, data.password)
      localStorage.setItem("token", auth.authToken)
      this.props.history.push("/")
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors }
        const { data } = error.response
        errors["email"] = data.message
        this.setState({ errors })
      }
    }
  }

  render() {
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
