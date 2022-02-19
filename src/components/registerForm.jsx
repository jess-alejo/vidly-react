import React from "react"
import Form from "./common/form"
import Joi from "joi-browser"

class RegisterForm extends Form {
  state = { data: { username: "", email: "", password: "" }, errors: {} }

  schema = {
    username: Joi.string().label("Username").required().min(3),
    email: Joi.string().label("Email").required().email(),
    password: Joi.string().label("Password").required().min(5),
  }

  doSubmit = () => {
    // call API
    console.log("Registered")
  }

  render() {
    return (
      <form className="form-register" onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username")}
        {this.renderInput("email", "Email", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderSubmitButton("Register", "mt-3")}
      </form>
    )
  }
}

export default RegisterForm
