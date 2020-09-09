import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import truncatise from 'truncatise';
import Skeleton from 'react-loading-skeleton';
import MovieImage from '../../core/components/MovieImage';
import MovieRating from '../../movie/components/MovieRating';


const truncateOptions = {
  TruncateBy: 'words',
  TruncateLength: 3,
  StripHTML: true,
  Strict: true,
  Suffix: '...',
};

const fullTitle = movie => `${movie.title}`;

const MovieItem = ({ movie, genre, single, children }) => (
  <div className={cn('movie-item', { single })} title={fullTitle(movie)}>
    <Link to={`/movies/${genre}/${movie.id}`}>
      <MovieImage movie={movie} />

      <h3 className="movie-item-title" title={fullTitle(movie)}>
        {truncatise(fullTitle(movie), truncateOptions)}
      </h3>
      <MovieRating votes={movie.vote_average} voteCount={movie.vote_count} />
    </Link>
    {children}
  </div>
);

export const MovieItemSkeleton = () => (
  <div className="movie-item skeleton">
    <Skeleton height={260} />
    <Skeleton width={80} />
    <Skeleton widht={40} />
  </div>
)

export default MovieItem;
