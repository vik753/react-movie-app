/*
 * https://www.themoviedb.org/settings/api
 * Ключ API (v3 auth)  21629b2bbf4bb4857806d309dcfd1837
 *
 * Пример API-запроса  https://api.themoviedb.org/3/movie/550?api_key=21629b2bbf4bb4857806d309dcfd1837
 *
 * Ключ доступа к API (v4 auth)
 * eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTYyOWIyYmJmNGJiNDg1NzgwNmQzMDlkY2ZkMTgzNyIsInN1YiI6IjVlOTMwZjczY2NiMTVmMDAxMzZmMDFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLBaAiEsfkafJrpXoK5GHft3hGuE9hGlA6S-dI6b2OU
 *
 * https://developers.themoviedb.org/3/configuration/get-api-configuration
 */

const mainUrl = `https://api.themoviedb.org`;
const mainImgUrl = `https://image.tmdb.org`;
const apiKey = `21629b2bbf4bb4857806d309dcfd1837`;

async function getMoviesResponse(from = 0, to = 12) {
  // console.log(from, to);
  try {
    const promisesArr = [];
    for (let x = from; x < to; x++) {
      promisesArr.push(fetch(`${mainUrl}/3/movie/${x}?api_key=${apiKey}`));
    }

    const responses = await Promise.all(promisesArr);
    const successfulResponse = responses.filter((res) => res.status === 200);
    // console.log("successfulResponse: ", successfulResponse);
    return successfulResponse.length ? successfulResponse : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Function serializeMovies, array of movies turn in the Object {movie.id: movie}
 * @param {Array} moviesArr
 */
function serializeMovies(moviesArr) {
  const moviesObj = moviesArr.reduce((acc, movie) => {
    acc[movie.id] = movie;
    return acc;
  }, {});
  return moviesObj;
}

/**
 * Add into movie object reference on the banner -> banner: 'string path'
 * @param {Array} movies
 */
function getMoviesBanners(movies) {
  const moviesWithBanners = movies.map((movie) => {
    return {
      ...movie,
      banner: !movie.poster_path
        ? null
        : `${mainImgUrl}/t/p/w300${movie.poster_path}`,
    };
  });
  return moviesWithBanners;
}

async function getMovies(
  moviesOnPage = 12,
  lastMovieId = 0,
  firstMovieId = 0,
  pageNumber = 1
) {
  const currPage = pageNumber;
  let movies = [];
  let firstId = firstMovieId;
  let lastId = lastMovieId;
  let errors = 0;

  // we need 12 movies, so let's get them
  while (movies.length < moviesOnPage) {
    const from = lastId;
    const to = lastId + (moviesOnPage - movies.length);
    console.log("from:", from, "to:", to);
    const currentMovies = await getMoviesResponse(from, to);
    console.log("currentMovies: ", currentMovies);

    // check fetch errors
    if (!currentMovies) {
      lastId++;
      errors++;
      if (errors === 40) {
        return {
          error: true,
          movies: {},
          pageNum: pageNumber,
          firstMovId: 0,
          lastMovId: 0,
        };
      }
      continue;
    }

    errors = 0;

    const moviesArr = await Promise.all(
      currentMovies.map((movie) => movie.json())
    );
    movies = [...movies, ...moviesArr];
    lastId = moviesArr[moviesArr.length - 1].id + 1;
  }

  firstId = movies[0].id;
  lastId = movies[movies.length-1].id;
  console.log("firstId", firstId, "lastId", lastId);

  // get movies pictures
  const moviesWithBanners = getMoviesBanners(movies);

  // serialize movies
  const moviesObj = serializeMovies(moviesWithBanners);

  return {
    error: false,
    movies: moviesObj,
    pageNum: pageNumber,
    firstMovId: firstId,
    lastMovId: lastId,
  };
}

export { getMovies };
