import React, { Component } from "react";

import { getMovies } from "../../api/api";
import "./app.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      movies: null, // {movieId: movieObject}
      moviesOnPage: 12,
      pageNumber: 1,
      firstMovieId: 0,
      lastMovieId: 0,
      pageHistory: [], //[2,17,...] -> [pageNumber = index + 1, firstMovieId]
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    await this.setState(() => ({
      isLoading: true,
    }));

    const { moviesOnPage, lastMovieId } = this.state;
    const { error, movies, firstMovId, lastMovId } = await getMovies(
      moviesOnPage,
      lastMovieId + 1
    );

    if (error) {
      await this.setState(() => ({ error: true }));
      return;
    }
    await this.setState(() => ({
      movies,
      error,
      firstMovieId: firstMovId,
      lastMovieId: lastMovId,
      pageHistory: [...new Set([...this.state.pageHistory, firstMovId])],
      isLoading: false,
    }));
  };

  paginationHandler = async (e) => {
    const { page } = e.target.dataset;

    switch (page) {
      case "first":
        await this.setState(() => ({
          pageNumber: 1,
          lastMovieId: 0,
        }));
        break;
      case "previous":
        const newLastId = this.state.pageHistory[this.state.pageNumber - 2];
        console.log("newLastId", newLastId);
        await this.setState(() => ({
          pageNumber:
            this.state.pageNumber !== 1
              ? this.state.pageNumber - 1
              : this.state.pageNumber,
          lastMovieId: this.state.pageHistory[this.state.pageNumber - 2] - 1,
        }));
        break;
      case "next":
        await this.setState(() => ({
          pageNumber: this.state.pageNumber + 1,
        }));
        break;
    }
    this.fetchMovies();
  };

  render() {
    // console.log(this);

    const cards =
      !this.state.movies || this.state.error ? (
        <div>
          Error for fetching movies... Connect with administrator, please.
        </div>
      ) : (
        Object.values(this.state.movies).map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            style={{
              backgroundImage: `url(${
                movie.banner
                  ? movie.banner
                  : `./img/blank-img.jpg`
              })`,
            }}
          >
            id: {movie.id}, Title: {movie.original_title}
          </div>
        ))
      );

    return (
      <div className="app-wrapper">
        <header>
          <div className="header-wrapper">
            <h1>Movies by TMDB</h1>
          </div>
        </header>
        <main>
          <div className="main-wrapper">
            {cards}
          </div>
        </main>
        <footer>
          <div className="footer-wrapper">
            <button
              data-page="first"
              onClick={this.paginationHandler}
              disabled={
                this.state.pageNumber === 1 ||
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
                this.state.pageNumber === 1 ||
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
                {this.state.pageNumber}
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
