import { combineReducers } from 'redux';
import uniq from 'lodash.uniq';

import byId from './byId';

import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../actions/movies';
import createErrorReducer from './createErrorReducer';
import createFetchingReducer from './createFetchingReducer';


const allIdsInitialState = { ids: [], originalIds: [] };

export const allIds = (state = allIdsInitialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ids: uniq([...state.ids, ...action.response.result]),
        originalIds: [...state.originalIds, ...action.response.result]
      };
    default:
      return state;
  }
}

export const isFetching = createFetchingReducer([
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
], true);

export const errorMessage = createErrorReducer([
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
]);

export default combineReducers({
  byId,
  allIds,
  isFetching,
  errorMessage,
});

export const getMovies = (state) => state.allIds.ids;
export const getDumpingIds = (state) => state.allIds.originalIds;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
