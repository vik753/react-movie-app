/*
 * https://www.themoviedb.org/settings/api
 * Ключ API (v3 auth)  21629b2bbf4bb4857806d309dcfd1837
 *
 * Пример API-запроса all films  https://api.themoviedb.org/3/discover/movie?api_key=21629b2bbf4bb4857806d309dcfd1837&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
 *
 * Пример API-запроса film by id  https://api.themoviedb.org/3/movie/550?api_key=21629b2bbf4bb4857806d309dcfd1837
 *
 * Ключ доступа к API (v4 auth)
 * eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTYyOWIyYmJmNGJiNDg1NzgwNmQzMDlkY2ZkMTgzNyIsInN1YiI6IjVlOTMwZjczY2NiMTVmMDAxMzZmMDFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLBaAiEsfkafJrpXoK5GHft3hGuE9hGlA6S-dI6b2OU
 *
 * https://developers.themoviedb.org/3/configuration/get-api-configuration
 */

const mainUrl = `https://api.themoviedb.org/3/discover/movie`;
const mainImgUrl = `https://image.tmdb.org`;
const findUrl = `https://api.themoviedb.org/3/search/movie`;
const apiKey = `21629b2bbf4bb4857806d309dcfd1837`;

function serializeMovies(arr) {
  return arr.reduce((acc, movie) => {
    acc[movie.id] = movie;
    return acc;
  }, {});
}

function setBanner(arr) {
  return arr.map((movie) => ({
    ...movie,
    banner: movie.poster_path
      ? `${mainImgUrl}/t/p/w500${movie.poster_path}`
      : "img/blank-img.jpg",
    //https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  }));
}

const fetchMovies = async (page, filter, adult, findMovie) => {
  const currPage = page;
  const currFilter = filter;
  const isAdult = adult;
  const findingMovie = findMovie;
  try {
    let response = null;
    if (currFilter === "search" && findingMovie.length) {
      response = await fetch(
        `${findUrl}?api_key=${apiKey}&language=en-US&query=${findingMovie}&page=${currPage}&include_adult=${isAdult}`
      );
    } else {
      response = await fetch(
        `${mainUrl}?api_key=${apiKey}&language=en-US&sort_by=${currFilter}&include_adult=${isAdult}&include_video=false&page=${currPage}`
      );
    }

    if (!response.ok) {
      throw new Error(`Cant fetch movies!`);
    }
    const moviesRes = await response.json();
    const { page, total_pages, results } = moviesRes;

    const moviesWithBanners = setBanner(results);
    const movies = serializeMovies(moviesWithBanners);
    return {
      error: false,
      page,
      total_pages,
      movies,
    };
  } catch (error) {
    console.log(error);
    return { error: true, page, total_pages: null, movies: null };
  }
};

export { fetchMovies };
