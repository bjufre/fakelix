import { createStore, applyMiddleware } from 'redux';
import fetch from 'isomorphic-unfetch';
import { ajax } from 'rxjs/ajax';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import moviesReducer from './reducers';
import { fetchMovieEpic } from './epics/movie';
import { fetchMoviesEpic, fetchGenreMoviesEpic } from './epics/movies';
import { from } from 'rxjs';


const rootEpic = combineEpics(
  fetchMovieEpic,
  fetchMoviesEpic,
  fetchGenreMoviesEpic,
  // fetchComicEpic
);

export default () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      ajax: ({ url, method, crossDomain }) => from(fetch(url, { method, crossDomain }).then(response => response.json()))
    }
  });
  const middlewares = [
    epicMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    moviesReducer,
    applyMiddleware(...middlewares)
  );

  epicMiddleware.run(rootEpic);

  return { store };
}
