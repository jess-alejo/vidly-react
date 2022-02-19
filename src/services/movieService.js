import http from "./httpService"
import { apiUrl } from "../config.json"

const apiEndPoint = apiUrl + "/movies"

function movieUrl(movieId) {
  return `${apiEndPoint}/${movieId}`
}

function getMovies() {
  return http.get(apiEndPoint)
}

function getMovie(movieId) {
  return http.get(movieUrl(movieId))
}

function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie }
    delete body.id
    return http.put(movieUrl(movie.id), body)
  }

  return http.post(apiEndPoint + "/movies", movie)
}

function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId))
}

export { deleteMovie, saveMovie, getMovie, getMovies }
