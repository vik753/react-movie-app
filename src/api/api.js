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

const mainUrl = `https://api.themoviedb.org/3/movie`;
const apiKey = `21629b2bbf4bb4857806d309dcfd1837`;

async function getMoviesResponse(from = 0, to = 12) {
  console.log(from, to);
  try {
    const promisesArr = [];
    for (let x = from; x < to; x++) {
      promisesArr.push(
        fetch(
          `https://api.themoviedb.org/3/movie/${x}?api_key=21629b2bbf4bb4857806d309dcfd1837`
        )
      );
    }

    const responses = await Promise.all(promisesArr);
    const successfulResponse = responses.filter((res) => res.status === 200);
    console.log("successfulResponse: ", successfulResponse);
    return successfulResponse;
  } catch (error) {
    console.log("Error fetching movies: ", error);
  }
}

async function getMovies(moviesPerPage = 12) {
  let movies = [];
  let lastId = 0;

  while (movies.length < moviesPerPage) {
    const from = lastId;
    const to = lastId + (moviesPerPage - movies.length);
    const currentMovies = await getMoviesResponse(from, to);
    const moviesArr = await Promise.all(
      currentMovies.map((movie) => movie.json())
    );
    movies = [...movies, ...moviesArr];
    lastId = moviesArr[moviesArr.length - 1].id + 1;
  }

  return movies;
}

export { getMovies };

/*
try {
    await Promise.all(requests)
      .then((responses) => {
        // all responses are resolved successfully
        for (let response of responses) {
          console.log(`${response.url}: ${response.status}`); // shows 200 for every url
        }

        return responses;
      })
      // map array of responses into an array of response.json() to read their content
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      // all JSON answers are parsed: "users" is the array of them
      .then((movies) => movies.forEach((movie) => console.log(movie)));

  }
   */
