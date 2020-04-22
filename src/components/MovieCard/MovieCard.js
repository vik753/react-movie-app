import React from "react";
import "./movie-card.scss";
import CircleRating from "./../CircleRating/CircleRating";

const MovieCard = (props) => {
  const { movie } = props;
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "No release data";
  return (
    <div className="movie-card" onClick={() => props.cardClick(`url(${
            movie.banner ? movie.banner : `./img/blank-img.jpg`
          })`)}>
      <div
        className="movie-bg"
        style={{
          backgroundImage: `url(${
            movie.banner ? movie.banner : `./img/blank-img.jpg`
          })`,
        }}
      ></div>
      <div className="movie-overview">
        <p className="movie-year">{releaseYear}</p>
        <p className="movie-title">{movie.original_title}</p>
        <div className="rating-wrapper">
          <CircleRating
            rating={Number(movie.vote_average) || null}
            id={movie.id}
          />
        </div>
      </div>

      {/* <span className="movie-year">{movie.vote_average}</span> */}
    </div>
  );
};

export default MovieCard;
