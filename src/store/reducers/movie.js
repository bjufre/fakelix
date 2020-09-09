import { combineReducers } from "redux";

import createErrorReducer from "./createErrorReducer";
import createFetchingReducer from "./createFetchingReducer";
import {
  LOCATION_CHANGE,
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from "../actions/index";


export const detail = (state = null, action) => {
  switch (action.type) {
    case FETCH_MOVIE_SUCCESS:
      return action.response;
    case LOCATION_CHANGE:
    case FETCH_MOVIE_REQUEST:
    caseMOVIEH_MOVIE_FAILURE:
      return null;
    default:
      return state;
  }
};

export const isFetching = createFetchingReducer([
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
], true);

export const errorMessage = createErrorReducer([
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
]);

export default combineReducers({
  detail,
  isFetching,
  errorMessage
});

export const getMovie = (state, id) => state.detail ? state.detail[id] : state.detail;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
