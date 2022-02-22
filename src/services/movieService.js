import http from "./httpService"
import { apiUrl } from "../config.json"

const moviesUrl = apiUrl + "/movies"

function movieUrl(movieId) {
  return `${moviesUrl}/${movieId}`
}

function getMovies() {
  return http.get(moviesUrl)
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

  return http.post(moviesUrl, movie)
}

function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId))
}

export { deleteMovie, saveMovie, getMovie, getMovies }
