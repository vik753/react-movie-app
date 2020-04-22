import React, { Component } from "react";

import { fetchMovies } from "../../api/api";
import MovieCard from "./../MovieCard/MovieCard";
import "./app.scss";

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
    };
  }

  async componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    await this.setState(() => ({
      isLoading: true,
    }));

    const { error, page, total_pages, movies } = await fetchMovies(
      this.state.page,
      this.state.filter,
      this.state.adult,
      this.state.findMovie
    );

    this.setState(() => ({
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
    const { page } = e.target.dataset;
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
      case "next":
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
      await this.setState(() => ({ adult: !this.state.adult, page: 1 }));
    } else {
      const { filter } = e.target.dataset;
      await this.setState(() => ({ filter, page: 1, findMovie: null }));
    }
    pageNumberInput.value = this.state.page;
    findForm.reset();

    this.getMovies();
  };

  pageInputHandler = async (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      const nextPage = e.target.value;
      await this.setState(() => ({ page: nextPage }));
      this.getMovies();
    }
  };

  findMovieHandler = async (e) => {
    e.preventDefault();
    const findForm = e.target;
    const findMovie = findForm.elements["find-input"].value.trim();
    if (findMovie.length) {
      this.setState(() => ({ filter: "search", findMovie }));
      await this.getMovies();
      // findForm.reset();
    }
  };

  findFormClear = async (e) => {
    const pageNumberInput = document.querySelector("#currentPage");
    const findForm = document.querySelector(".find-form");
    findForm.reset();
    this.setState(() => ({
      filter: "popularity.desc",
      findMovie: null,
      page: 1,
    }));
    await this.getMovies();
    pageNumberInput.value = this.state.page;
  };

  render() {
    console.log(this);

    const cards =
      !this.state.movies || this.state.error ? (
        <div>
          Error for fetching movies... Connect with administrator, please.
        </div>
      ) : (
        Object.values(this.state.movies).map((movie, index) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })
      );

    return (
      <div className="app-wrapper">
        <header>
          <div className="header-wrapper">
            <h1 id="headerTitle">Movies by TMDB</h1>
            <form
              name="find-form"
              className="find-form"
              onSubmit={this.findMovieHandler}
            >
              <input
                name="find-input"
                type="text"
                placeholder="Type to find movie"
              />
              <i className="fa fa-search"></i>
              <i className="fa fa-close" onClick={this.findFormClear}></i>
            </form>
            <form
              name="filter-form"
              className="filter-form"
              onChange={this.changeFilter}
            >
              <h3>Filter by: </h3>
              <div className="inputs-wrapper">
                <input
                  id="filter1"
                  name="filter"
                  type="radio"
                  data-filter="popularity.desc"
                  defaultChecked
                />
                <label htmlFor="filter1">Popularity</label>
                <input
                  id="filter2"
                  name="filter"
                  type="radio"
                  data-filter="release_date.desc"
                />
                <label htmlFor="filter2">Release date</label>
                <input
                  id="filter3"
                  name="filter"
                  type="radio"
                  data-filter="vote_average.desc"
                />
                <label htmlFor="filter3">Vote</label>
                <input
                  type="checkbox"
                  name="filter_adult"
                  id="filter4"
                  defaultChecked={false}
                />
                <label htmlFor="filter4">Adult</label>
              </div>
            </form>
          </div>
        </header>
        <main>
          <div className="main-wrapper" id="main-wrapper">
            {cards}
          </div>
        </main>
        <footer>
          <div className="footer-wrapper">
            <button
              data-page="first"
              onClick={this.paginationHandler}
              disabled={
                this.state.page === 1 ||
                this.state.error ||
                this.state.isLoading
                  ? true
                  : false
              }
              className="primary"
            >
              Page 1
            </button>
            <button
              data-page="previous"
              onClick={this.paginationHandler}
              disabled={
                this.state.page === 1 ||
                this.state.error ||
                this.state.isLoading
                  ? true
                  : false
              }
              className="primary"
            >
              <i className="fa fa-chevron-left"></i>
              Prev
            </button>
            <span data-page="current" className="current-page">
              Current Page:
              <span className="current-page__number">
                {" "}
                <input
                  id="currentPage"
                  type="number"
                  min="1"
                  max={this.state.total_pages}
                  defaultValue={this.state.page}
                  onKeyUp={this.pageInputHandler}
                />{" "}
                from {this.state.total_pages}
              </span>
            </span>
            <button
              data-page="next"
              onClick={this.paginationHandler}
              disabled={this.state.error || this.state.isLoading ? true : false}
              className="primary"
            >
              Next
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
