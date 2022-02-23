import React from "react"
import Form from "./common/form"
import Joi from "joi-browser"
import { register } from "../services/userService"
import auth from "../services/authService"

class RegisterForm extends Form {
  state = { data: { name: "", email: "", password: "" }, errors: {} }

  schema = {
    name: Joi.string().label("Name").required().min(3),
    email: Joi.string().label("Email").required().email(),
    password: Joi.string().label("Password").required().min(5),
  }

  doSubmit = async () => {
    try {
      const { data } = await register(this.state.data)
      auth.loginWithToken(data.authToken)
      window.location = "/"
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        const { details: errorDetails } = ex.response.data
        for (const e in errorDetails) {
          errors[e] = errorDetails[e]
        }

        this.setState({ errors })
      }
    }
  }

  render() {
    return (
      <form className="form-register" onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderInput("email", "Email", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderSubmitButton("Register", "mt-3")}
      </form>
    )
  }
}

export default RegisterForm
