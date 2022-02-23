import jwtDecode from "jwt-decode"
import http from "./httpService"
import { apiUrl } from "../config.json"

const authUrl = apiUrl + "/auth"
const tokenKey = "authToken"

export async function login(email, password) {
  const { data } = await http.post(authUrl, { email, password })
  localStorage.setItem(tokenKey, data.authToken)

  return data
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function loginWithToken(token) {
  localStorage.setItem("authToken", token)
}

export function getCurrentUser() {
  try {
    const authToken = localStorage.getItem(tokenKey)
    return jwtDecode(authToken)
  } catch (ex) {
    return null
  }
}

export default {
  login,
  logout,
  loginWithToken,
  getCurrentUser,
}
