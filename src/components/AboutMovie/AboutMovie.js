import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router'
import './aboutMovie.scss'

const AboutMovie = (props) => {
  console.log(props);
  return (
    <main className="about-movie">
      <div className="about-movie__wrapper">
        <h2>About Movie, movie id: {props.match.params.id}</h2>
        <Link to="/">Go home</Link>
      </div>
    </main>

  );
}

export default withRouter(AboutMovie);
