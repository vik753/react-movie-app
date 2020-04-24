import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router'
import './aboutMovie.scss'

const AboutMovie = (props) => {
  // console.log(props);
  const {currentMovie} = props;
  const {original_title, overview, popularity, release_date, vote_average, vote_count} = props.currentMovie;
  return (
    <main className="about-movie">
      <div className="about-movie__wrapper">
        <div
          className="movie-banner"
          style={{
            backgroundImage: `url(${
              currentMovie.banner ? currentMovie.banner : "./img/blank-img.jpg"})`
          }}>
          <Link to="/" className="goHomeButton">Go to home page</Link>
        </div>
        <div className="movie-article">
          <h1>{original_title}</h1>
          <article>
            <p>Release date: {release_date}</p>
            <p>{overview}</p>
            <p>Popularity: {popularity}</p>
            <p
              style={Number(vote_average) >= 8 ? {color: '#00ec00'} : Number(vote_average) >= 5 ? {color: 'yellow'} : {color: 'tomato'}}
            >Vote: {vote_average}, count: {vote_count}</p>
          </article>
        </div>
      </div>
    </main>

  );
}

export default withRouter(AboutMovie);
