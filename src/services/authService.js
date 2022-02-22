import http from "./httpService"
import { apiUrl } from "../config.json"

const authUrl = apiUrl + "/auth"

export function login(email, password) {
  return http.post(authUrl, { email, password })
}
