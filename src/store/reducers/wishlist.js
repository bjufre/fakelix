import uniq from 'lodash.uniq';
import { ADD_WISHLIST_MOVIE, REMOVE_WISHLIST_MOVIE } from '../actions/wishlist';

const initialState = [];

export default function wishlist(state = initialState, action) {
  switch (action.type) {
    case ADD_WISHLIST_MOVIE:
      return uniq([...state, action.movieId]);
    case REMOVE_WISHLIST_MOVIE:
      return uniq(state.filter(movieId => movieId !== action.movieId));
    default:
      return state;
  }
}