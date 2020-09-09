import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_GENRE_MOVIES_REQUEST,
  fetchMovies,
  fetchGenreMovies,
  fetchMoviesSuccess,
  fetchMoviesFailure
} from './movies';
import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
  fetchMovie,
  fetchMovieSuccess,
  fetchMovieFailure
} from './movie';
import {
  ADD_WISHLIST_MOVIE,
  REMOVE_WISHLIST_MOVIE,
  addWishlistMovie,
  removeWishlistMovie
} from './wishlist';


const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
const CANCEL_REQUESTS = "@@movies/CANCEL_REQUESTS";

const cancelRequests = () => ({
  type: CANCEL_REQUESTS,
});

export {
  // Action types
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_GENRE_MOVIES_REQUEST,

  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,

  ADD_WISHLIST_MOVIE,
  REMOVE_WISHLIST_MOVIE,

  CANCEL_REQUESTS,
  LOCATION_CHANGE,

  // Action creators
  cancelRequests,

  fetchMovies,
  fetchGenreMovies,
  fetchMoviesSuccess,
  fetchMoviesFailure,

  fetchMovie,
  fetchMovieSuccess,
  fetchMovieFailure,

  addWishlistMovie,
  removeWishlistMovie,
}
