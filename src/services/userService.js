import http from "./httpService"
import { apiUrl } from "../config.json"

const usersUrl = `${apiUrl}/users`

export function register(user) {
  return http.post(usersUrl, user)
}
