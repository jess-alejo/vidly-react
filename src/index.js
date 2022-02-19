import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"

import App from "./App"
import logger from "./services/logService"

import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

logger.init()

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
registerServiceWorker()
