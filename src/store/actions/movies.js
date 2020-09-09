export const FETCH_MOVIES_REQUEST = '@@movies/FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = '@@movies/FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = '@@movies/FETCH_MOVIES_FAILURE';
export const FETCH_GENRE_MOVIES_REQUEST = '@@movies/FETCH_GENRE_MOVIES_REQUEST';

export const fetchMovies = (offset = 0) => ({
  type: FETCH_MOVIES_REQUEST,
  offset
});

export const fetchMoviesSuccess = ({ response, offset, total }) => ({
  type: FETCH_MOVIES_SUCCESS,
  response,
  offset,
  total
});

export const fetchMoviesFailure = message => ({
  type: FETCH_MOVIES_FAILURE,
  message,
});

export const fetchGenreMovies = genre => ({
  type: FETCH_GENRE_MOVIES_REQUEST,
  genre
});
