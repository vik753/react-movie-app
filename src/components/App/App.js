import React, { Component } from "react";

import { getMovies } from "../../api/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      movies: null, // {pageNumber: {movieId: movieObject}}
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
      movies,
      lastIdOnPage: lastId,
    }));
  };

  paginationHandler = async (e) => {
    const { page } = e.target.dataset;

    // switch (page) {
    //   case "first":
    //     this.setState(() => ({
    //       currentPage: 1,
    //       lastIdOnPage: 0,
    //     }));
    //     break;
    //   case "previous":
    //     this.setState(() => ({
    //       currentPage:
    //         this.state.currentPage !== 1
    //           ? this.state.currentPage - 1
    //           : this.state.currentPage,
    //       lastIdOnPage:
    //         this.state.currentPage !== 1
    //           ? this.state.lastIdOnPage - this.state.moviesOnPage
    //           : 0,
    //     }));
    //     break;
    //   case "next":
    //     this.setState(() => ({
    //       currentPage: this.state.currentPage + 1,
    //     }));
    //     break;
    // }

    // this.fetchMovies();
    // this.getMovieCard();
  };

  render() {
    const cards = !this.state.movies
      ? null
      : Object.values(
          this.state.movies[this.state.currentPage]
        ).map((movie) => <div key={movie.id}>{movie.original_title}</div>);
    console.log(this);


    return (
      <div className="main-wrapper">
        <header>
          <h1>Movies</h1>
        </header>
        <main>
          <div className="movies-wrapper">{cards}</div>
        </main>
        <footer>
          {this.state.currentPage !== 1 ? (
            <React.Fragment>
              <button data-page="first" onClick={this.paginationHandler}>
                First page
              </button>
              <button data-page="previous" onClick={this.paginationHandler}>
                Prev
              </button>
            </React.Fragment>
          ) : null}
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
