import { FETCH_MOVIES_SUCCESS, FETCH_MOVIE_SUCCESS } from '../actions';

const byId = (state = {}, action) => {
  if (action.response && action.type === FETCH_MOVIES_SUCCESS) {
    return ({
      ...state,
      ...action.response.entities.movies,
    });
  }

  if (action.response && action.type === FETCH_MOVIE_SUCCESS) {
    return ({
      ...state,
      ...action.response
    });
  }

  return state;
}

export default byId;

export const getItem = (state, id) => state.byId[id];
