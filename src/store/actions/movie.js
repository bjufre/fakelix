export const FETCH_MOVIE_REQUEST = '@@marvel-comics/FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = '@@marvel-comics/FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = '@@marvel-comics/FETCH_MOVIE_FAILURE';

export const fetchMovie = movieId => ({
  type: FETCH_MOVIE_REQUEST,
  movieId
});

export const fetchMovieSuccess = (movieId, response) => ({
  type: FETCH_MOVIE_SUCCESS,
  response,
  movieId
});

export const fetchMovieFailure = (movieId, message) => ({
  type: FETCH_MOVIE_FAILURE,
  message,
  movieId,
});
