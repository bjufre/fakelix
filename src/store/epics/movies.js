import { of, forkJoin, merge } from 'rxjs';
import { switchMap, pluck, takeUntil, map, catchError, tap, mergeMap, filter, flatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { normalize } from 'normalizr';

import buildUrl from './utils/buildUrl';
import cancelActions from './utils/cancelActions';
import * as schema from '../schema';
import {
  CANCEL_REQUESTS,
  LOCATION_CHANGE,
  FETCH_MOVIES_REQUEST,
  FETCH_GENRE_MOVIES_REQUEST,
  fetchGenreMovies,
  fetchMoviesSuccess,
  fetchMoviesFailure
} from '../actions';

const MAX_GENRES = 3;

const genresRequest = () => ({
  method: 'GET',
  crossDomain: true,
  url: buildUrl('/genre/movie/list', {})
});

const moviesRequest = ({ genre }) => ({
  method: 'GET',
  crossDomain: true,
  url: buildUrl('/discover/movie', {
    with_genres: genre.id,
  })
});

const moviesError = (error) =>
  of(fetchMoviesFailure(error.message || 'Error Fetching Movies List'));

const moviesSuccess = (action) => ({ results = [] }) => {
  // Remove any movies/items with no title or no backdrop image that we can use
  const response = normalize(
    results.filter(m => m.title && m.backdrop_path).map(m => ({ ...m, genre: action.genre })),
    schema.arrayOfMovies
  );

  return fetchMoviesSuccess({ response });
};

export const fetchGenreMoviesEpic = (action$, store, { ajax }) =>
  action$.pipe(
    ofType(FETCH_GENRE_MOVIES_REQUEST),
    mergeMap(action =>
      ajax(moviesRequest(action)).pipe(
        map(moviesSuccess(action)),
        takeUntil(cancelActions(action$, LOCATION_CHANGE, CANCEL_REQUESTS)),
        catchError(moviesError)
      )
    )
  );

export const fetchMoviesEpic = (action$, store, { ajax }) =>
  action$.pipe(
    ofType(FETCH_MOVIES_REQUEST),
    switchMap(action =>
      ajax(genresRequest()).pipe(
        pluck('genres'),
        map(genres => MAX_GENRES ? genres.slice(0, MAX_GENRES) : genres),
        switchMap(genres =>
          merge(genres.map(g => fetchGenreMovies(g)))
        ),
        takeUntil(cancelActions(action$, LOCATION_CHANGE, CANCEL_REQUESTS)),
        catchError(moviesError)
      )
    )
  );
