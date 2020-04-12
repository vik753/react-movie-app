import React, { Component } from "react";

import { getMovies } from "../../api/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      movieOnPage: 12,
      currentPage: 1,
    };
  }

  async componentDidMount() {
    const moviesData = await getMovies();
    this.setState(() => ({
      movies: moviesData,
    }));
  }

  render() {
    console.log(this);
    return (
      <div>
        <h1>App header</h1>
        <ol>
          {this.state.movies
            ? this.state.movies.map((obj) => <li>{obj.original_title}</li>)
            : null}
        </ol>
      </div>
    );
  }
}

export default App;
