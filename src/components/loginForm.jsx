import React from "react"
import Form from "./common/form"
import Joi from "joi-browser"

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
    password: Joi.string().required().min(6).label("Password"),
  }

  doSubmit = () => {
    // send api request
    console.log("Submitted")
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
