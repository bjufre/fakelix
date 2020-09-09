import groupBy from 'lodash.groupby';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import wishlist from './wishlist';
import * as fromById from './byId';
import movie, * as fromDetail from './movie';
import movies, * as fromMovies from './movies';


export default combineReducers({
  movie,
  movies,
  wishlist,
  router: routerReducer
})

export const getGenres = (state) => {
  const ids = fromMovies.getMovies(state.movies);
  const movies = ids.map(id => fromById.getItem(state.movies, id));
  const groups = groupBy(movies || [], movie => {
    if (movie.genre) return movie.genre.name;
    const [genre] = movie.genres;
    return genre ? genre.name : 'Unknown';
  });

  return Object.keys(groups).map(name => ({
    name,
    movies: groups[name],
  }));
}

export const getMovies = (state) => {
  const ids = fromMovies.getMovies(state.movies);
  const movies = ids.map(id => fromById.getItem(state.movies, id));
  return groupBy(movies, movie => movie.genre.name);
}

export const getWishlist = (state) => {
  return state.wishlist;
};

export const getWishlistMovies = (state) => {
  const ids = state.wishlist;
  return ids.map(id => fromById.getItem(state.movies, id));
};

// If time would allowed, we could've abstracted and
// normalized the state a bit more. Which would've
// allowed us to "load the cached" data for a movie.
export const getMovie = (state, id) =>
  fromDetail.getMovie(state.movie, id);

export const getIsFetching = (state) =>
  fromMovies.getIsFetching(state.movies) || fromDetail.getIsFetching(state.movie);
