export const ADD_WISHLIST_MOVIE = '@@movies/ADD_WISHLIST_MOVIE';
export const REMOVE_WISHLIST_MOVIE = '@@movies/REMOVE_WISHLIST_MOVIE';

export const addWishlistMovie = movieId => ({
  type: ADD_WISHLIST_MOVIE,
  movieId,
});

export const removeWishlistMovie = movieId => ({
  type: REMOVE_WISHLIST_MOVIE,
  movieId,
});
