import React, { Component, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getMovie, getWishlist } from '../store/reducers';
import { fetchMovie, removeWishlistMovie, addWishlistMovie } from '../store/actions';
import MovieDetail from './components/MovieDetail';
import useWishlist from '../core/hooks/useWishlist';


export function Movie(props) {
  const { movieId, fetchMovie } = props;
  const { toggleWishlistMovie } = useWishlist();
  const toggleMovie = useCallback(() => {
    toggleWishlistMovie(movieId, props.inWishlist);
  }, [toggleWishlistMovie]);
  useEffect(() => {
    fetchMovie(movieId)
  }, [movieId, fetchMovie]);

  return <MovieDetail {...props} toggleWishlist={toggleMovie} />
}

const mapStateToProps = (state, { match: { params }}) => {
  return ({
    movieId: ~~params.id,
    genre: params.genre,
    movie: getMovie(state, params.id) || {},
    inWishlist: getWishlist(state).includes(~~params.id),
  });
};

const mapDispatchToProps = (dispatch, { match: { params }}) => ({
  fetchMovie: movieId => dispatch(fetchMovie(movieId)),
  addWishlistMovie: movieId => dispatch(addWishlistMovie(movieId)),
  removeWishlistMovie: movieId => dispatch(removeWishlistMovie(movieId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie));
