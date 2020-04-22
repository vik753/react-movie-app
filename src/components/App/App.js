import React, { Component } from "react";

import Header from "./../Header/Header";
import Main from "./../Main/Main";
import Footer from "./../Footer/Footer";
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
      backgroundImage: 'transparent'
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
      findForm.reset();
    }
    pageNumberInput.value = this.state.page;

    this.getMovies();
  };

  pageInputHandler = async (e) => {
    e.preventDefault();
    const nextPage = e.target.value;
    if (e.keyCode === 13 && nextPage <= this.state.total_pages) {
      await this.setState(() => ({ page: nextPage }));
      this.getMovies();
    }
  };

  findMovieHandler = async (e) => {
    e.preventDefault();
    const findForm = e.target;
    const findMovie = findForm.elements["find-input"].value.trim();
    if (findMovie.length) {
      this.setState(() => ({ filter: "search", findMovie, page: 1 }));
      await this.getMovies();
      // findForm.reset();
    }
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

  clickCardHandler = async (movieBg) => {
    await this.setState(() => ({ backgroundImage: movieBg }));
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
            <MovieCard
              movie={movie}
              key={movie.id}
              cardClick={this.clickCardHandler}
            />
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
        <Main cards={cards} bg={this.state.backgroundImage}/>
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
