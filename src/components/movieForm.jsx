import React from "react"
import Form from "./common/form"
import Joi from "joi-browser"

import { getMovie, saveMovie } from "../services/movieService"
import { getGenres } from "../services/genreService"

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    errors: {},
    genres: [],
  }

  schema = {
    id: Joi.string(),
    title: Joi.string().label("Title").required(),
    numberInStock: Joi.number().label("Number in Stock").required().min(0).max(100),
    genreId: Joi.string().label("Genre").required(),
    dailyRentalRate: Joi.number().label("Daily Rental Rate").min(1).max(10),
  }

  async componentDidMount() {
    await this.populateGenres()
    await this.populateMovies()
  }

  async populateGenres() {
    const { data: genres } = await getGenres()
    this.setState({ genres })
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id
      if (movieId === "new") return

      const { data: movie } = await getMovie(movieId)
      const data = this.mapToViewModel(movie)
      this.setState({ data: data })
    } catch (error) {
      if (error.response && error.response.status === 404) this.props.history.replace("/not-found")
    }
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderSubmitButton("Save", "mt-3 px-5")}
        </form>
      </div>
    )
  }

  doSubmit = async () => {
    await saveMovie(this.state.data)

    this.props.history.push("/movies")
  }

  mapToViewModel = movie => {
    console.log("Movie", movie)
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }
}

export default MovieForm

// import React from "react"

// const MovieForm = ({ match, history }) => {
//   return (
//     <React.Fragment>
//       <h1>Movie Form {match.params.id}</h1>
//       <button className="btn btn-primary" onClick={() => history.push("/movies")}>
//         Save
//       </button>
//     </React.Fragment>
//   )
// }

// export default MovieForm
