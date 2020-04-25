import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import Header from "./../Header/Header";
import Main from "../Main/Main";
import Footer from "./../Footer/Footer";
import {fetchMovies} from "../../api/api";
import MovieCard from "./../MovieCard/MovieCard";
import "./app.scss";
import AboutMovie from "../AboutMovie/AboutMovie";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      movies: null, // {movieId: movieObject}
      page: 1,
      total_pages: null,
      isLoading: false,
      filter: "popularity.desc", // vote_average.desc,  release_date.desc
      adult: false,
      findMovie: null,
      backgroundImage: "transparent",
      currentMovie: null,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    await this.setState(() => ({
      isLoading: true,
    }));

    const {error, page, total_pages, movies} = await fetchMovies(
      this.state.page,
      this.state.filter,
      this.state.adult,
      this.state.findMovie
    );

    await this.setState(() => ({
      error,
      movies,
      page,
      total_pages,
      isLoading: false,
    }));

    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.scrollTop = 0; // For Safari
  };

  paginationHandler = async (e) => {
    const pageNumberInput = document.querySelector("#currentPage");
    const {page} = e.target.dataset;
    switch (page) {
      case "first":
        await this.setState(() => ({
          page: 1,
        }));
        break;
      case "previous":
        await this.setState(() => ({
          page: this.state.page !== 1 ? this.state.page - 1 : this.state.page,
        }));
        break;
      default:
        await this.setState(() => ({
          page: this.state.page + 1,
        }));
        break;
    }
    pageNumberInput.value = this.state.page;
    await this.getMovies(this.state.page);
  };

  changeFilter = async (e) => {
    const pageNumberInput = document.querySelector("#currentPage");
    const findForm = document.querySelector(".find-form");
    if (e.target.name === "filter_adult") {
      await this.setState(() => ({adult: !this.state.adult, page: 1}));
    } else {
      const {filter} = e.target.dataset;
      await this.setState(() => ({filter, page: 1, findMovie: null}));
      findForm.reset();
    }
    pageNumberInput.value = this.state.page;

    await this.getMovies();
  };

  pageInputHandler = async (e) => {
    e.preventDefault();
    const nextPage = e.target.value;
    if (e.keyCode === 13 && nextPage <= this.state.total_pages) {
      await this.setState(() => ({page: nextPage}));
      await this.getMovies();
    }
  };

  findMovieHandler = async (e) => {
    e.preventDefault();
    const pageNumberInput = document.querySelector("#currentPage");
    const findForm = e.target;
    const findMovie = findForm.elements["find-input"].value.trim();
    if (findMovie.length) {
      await this.setState(() => ({filter: "search", findMovie, page: 1}));
      await this.getMovies();
    }
    pageNumberInput.value = this.state.page;
  };

  findFormClear = async (e) => {
    const pageNumberInput = document.querySelector("#currentPage");
    const findForm = document.querySelector(".find-form");
    findForm.reset();
    await this.setState(() => ({
      filter: "popularity.desc",
      findMovie: null,
      page: 1,
    }));
    await this.getMovies();
    pageNumberInput.value = this.state.page;
  };

  mouseOverCardHandler = async (movieBg) => {
    await this.setState(() => ({backgroundImage: movieBg}));
  };

  cardClickHandler = async (movie) => {
    await this.setState(() => ({currentMovie: movie}));
  }

  render() {
    // console.log(this);
    const cards =
      !this.state.movies || this.state.error ? (
        <div>
          Error for fetching movies... Connect with administrator, please.
        </div>
      ) : (
        Object.values(this.state.movies).map((movie, index) => {
          return (
            <Link
              className="cardLink"
              to={`/About`}
              key={movie.id}>
              <MovieCard
                movie={movie}
                mouseOverCard={this.mouseOverCardHandler}
                cardClick={this.cardClickHandler}
              />
            </Link>
          );
        })
      );
    return (
      <div className="app-wrapper">
        <Header
          findMovieHandler={this.findMovieHandler}
          findFormClear={this.findFormClear}
          changeFilter={this.changeFilter}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={
              (props) =>
                <Main
                  {...props}
                  cards={cards}
                  bg={this.state.backgroundImage}
                />
            }
          />
          <Route
            path="/About"
            exact
            render={(props) => <AboutMovie {...props} currentMovie={this.state.currentMovie}/>}
          />
        </Switch>
        <Footer
          state={this.state}
          paginationHandler={this.paginationHandler}
          pageInputHandler={this.pageInputHandler}
        />
      </div>
    );
  }
}

export default App;
