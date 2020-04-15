import React, { Component } from "react";

import { getMovies } from "../../api/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      movies: null, // {movieId: movieObject}
      moviesOnPage: 12,
      currentPage: 1,
      pageIds: {}, // {page_number: lastIdOnPage}
      lastIdOnPage: 0,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const { lastIdOnPage, moviesOnPage, currentPage } = this.state;
    const { error, movies, lastId } = await getMovies(
      moviesOnPage,
      lastIdOnPage,
      currentPage
    );

    if (error) {
      this.setState(() => ({ error: true }));
      return;
    }
    // console.log(movies, lastId);
    this.setState(() => ({
      movies: {
        ...this.state.movies,
        ...movies,
      },
      lastIdOnPage: lastId,
    }));
  };

  paginationHandler = async (e) => {
    const { page } = e.target.dataset;
    let currPage = this.state.currentPage;

    switch (page) {
      case "first":
        await this.setState(() => ({
          currentPage: 1,
          lastIdOnPage: 0,
        }));
        break;
      case "previous":
        // await this.setState(() => ({
        //   currentPage:
        //     this.state.currentPage !== 1
        //       ? this.state.currentPage - 1
        //       : this.state.currentPage,
        //   lastIdOnPage:
        //     this.state.currentPage !== 1
        //       ? this.state.lastIdOnPage - this.state.moviesOnPage
        //       : 0,
        // }));
        break;
      case "next":
        await this.setState(() => ({
          currentPage: this.state.currentPage + 1,
        }));
        break;
    }
    await this.getMoviesList();
  };

  async getMoviesList() {
    console.log(this.state);
    const needsMoviesLength = this.state.currentPage * this.state.moviesOnPage;
    if (needsMoviesLength > Object.values(this.state.movies).length) {
      await this.fetchMovies();
      // console.log("this.state: ", this.state);
    } else {
    }
  }

  renderUI() {
    const cards = !this.state.movies ? (
      <div>
        We can't fetch movies... Connect with your administrator, please.
      </div>
    ) : (
      Object.values(this.state.movies).map((movie) => (
        <div key={movie.id}>{movie.original_title}</div>
      ))
      );
    return cards;
  }

  render() {
    // const cards = !this.state.movies
    //   ? null
    //   : Object.values(
    //       this.state.movies[this.state.currentPage]
    //     ).map((movie) => <div key={movie.id}>{movie.original_title}</div>);
    console.log(this);

    return (
      <div className="main-wrapper">
        <header>
          <h1>Movies</h1>
        </header>
        <main>
          <div className="movies-wrapper">{this.state.movies && this.renderUI()}</div>
        </main>
        <footer>
          <button
            data-page="first"
            onClick={this.paginationHandler}
            disabled={this.state.currentPage === 1 ? true : false}
          >
            First page
          </button>
          <button
            data-page="previous"
            onClick={this.paginationHandler}
            disabled={this.state.currentPage === 1 ? true : false}
          >
            Prev
          </button>
          <button data-page="current">
            Current Page: {this.state.currentPage}
          </button>
          <button data-page="next" onClick={this.paginationHandler}>
            Next
          </button>
        </footer>
      </div>
    );
  }
}

export default App;
