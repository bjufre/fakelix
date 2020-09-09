import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { fromEvent } from 'rxjs';

import { getGenres } from '../store/reducers';
import { fetchMovies, cancelRequests } from '../store/actions';
import { getDumpingIds } from '../store/reducers/movies';
import { debounceTime, map, filter } from 'rxjs/operators';
import GenreSection from './components/GenreSection';
import Container from '../core/components/Container';
import MoviesLoading from './components/MoviesLoading';
import SEO from '../core/components/SEO';

export function Movies({ genres, fetchMovies, cancelRequests }) {
  useEffect(() => {
    fetchMovies();
    return () => cancelRequests();
  }, []);

  return (
    <>
      <SEO title="Movies" />
      <Container>
        <h1>Movies</h1>
      </Container>
      <div id="movies-list" className="movies-list">
        {
          !genres.length
            ? <MoviesLoading />
            : genres.map(genre => (
                <GenreSection key={genre.name} genre={genre} />
              ))
        }
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  genres: getGenres(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMovies()),
  cancelRequests: () => dispatch(cancelRequests()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
