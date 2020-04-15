import React, { Component } from "react";

import { getMovies } from "../../api/api";

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
    };
  }

  componentDidMount() {
    // console.log("Did mount");
    this.fetchMovies();
  }

  fetchMovies = async () => {
    console.log("Fetch");
    const { moviesOnPage, pageNumber, firstMovieId, lastMovieId } = this.state;
    const { error, movies, pageNum, firstMovId, lastMovId } = await getMovies(
      moviesOnPage,
      lastMovieId + 1,
      firstMovieId,
      pageNumber
    );

    if (error) {
      await this.setState(() => ({ error: true }));
      return;
    }
    // console.log(movies, lastId);
    await this.setState(() => ({
      movies: {
        ...movies,
      },
      error,
      pageNumber: pageNum,
      firstMovieId: firstMovId,
      lastMovieId: lastMovId,
      pageHistory: [
        ...this.state.pageHistory,
        (this.state.pageHistory[this.state.currentPage - 1] = firstMovId),
      ], 
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
    console.log(this);

    const cards =
      !this.state.movies || this.state.error ? (
        <div>
          Error for fetching movies... Connect with administrator, please.
        </div>
      ) : (
        Object.values(this.state.movies).map((movie) => (
          <li>
            id: {movie.id}, Title: {movie.original_title}
          </li>
        ))
      );

    return (
      <div className="main-wrapper">
        <header>
          <h1>Movies</h1>
        </header>
        <main>
          <ul className="movies-wrapper">{cards}</ul>
        </main>
        <footer>
          <button
            data-page="first"
            onClick={this.paginationHandler}
            disabled={this.state.pageNumber === 1 ? true : false}
          >
            First page
          </button>
          <button
            data-page="previous"
            onClick={this.paginationHandler}
            disabled={this.state.pageNumber === 1 ? true : false}
          >
            Prev
          </button>
          <button data-page="current">
            Current Page: {this.state.pageNumber}
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
