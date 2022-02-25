import jwtDecode from "jwt-decode"
import http from "./httpService"
import { apiUrl } from "../config.json"

const authUrl = apiUrl + "/auth"
const tokenKey = "authToken"

http.setAuthToken(getAuthToken())

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

export function isAdminUser() {
  const currentUser = getCurrentUser()
  return currentUser && currentUser.role === "admin"
}

export function getCurrentUser() {
  try {
    return jwtDecode(getAuthToken())
  } catch (ex) {
    return null
  }
}

export function getAuthToken() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  logout,
  loginWithToken,
  getCurrentUser,
  getAuthToken,
  isAdminUser,
}
