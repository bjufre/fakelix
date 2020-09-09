import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { normalize } from 'normalizr';
import buildUrl from './utils/buildUrl';
import cancelActions from './utils/cancelActions'
import * as schema from '../schema';
import {
  LOCATION_CHANGE,
  CANCEL_REQUESTS,
  FETCH_MOVIE_REQUEST,
  fetchMovieSuccess,
  fetchMovieFailure
} from '../actions';

const movieRequest = (movieId) => ({
  method: 'GET',
  crossDomain: true,
  url: buildUrl(`/movie/${movieId}`, {}),
});

const movieError = (movieId) => (error) =>
  of(fetchMovieFailure(movieId, error.message || 'Error Fetching Movie Detail'));

const movieSuccess = (movieId) => (response) => {
  const { entities: { movies } } = normalize(response, schema.movie);

  return fetchMovieSuccess(movieId, {
    [movieId]: {
      ...movies[movieId],
    },
  });
};

/**
 * This epic will fetch the movie detail for a particular page.
 */
export const fetchMovieEpic = (action$, store, { ajax }) =>
  action$.pipe(
    ofType(FETCH_MOVIE_REQUEST),
    switchMap(({ movieId }) =>
      ajax(movieRequest(movieId)).pipe(
        takeUntil(cancelActions(action$, CANCEL_REQUESTS, LOCATION_CHANGE)),
        map(movieSuccess(movieId)),
        catchError(movieError(movieId))
      )
    )
  );

