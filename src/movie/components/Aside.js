import React from 'react';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';
import TagList from '../../core/components/TagList';
import MovieRating from './MovieRating';
import MovieOverview from './MovieOverview';
import Button from '../../core/components/Button';

const ReleaseDate = ({ date }) => {
  if (!date) return <Skeleton />;
  return (
    <>
      <strong>Released:</strong> {date}
    </>
  );
}

const Aside = ({ movie, genre, toggleWishlist, inWishlist = false }) => (
  <aside>
    <div className="top">
      <h1 className="movie-title">{movie.title || <Skeleton />}</h1>
      <div className="movie-meta">
        <MovieRating votes={movie.vote_average} voteCount={movie.vote_count} />
        <p>
          <small>
            <ReleaseDate date={movie.release_date} />
          </small>
        </p>
      </div>
    </div>

    <div className="content">
      <TagList active={genre} items={movie.genres} field="name" />
      {movie.overview ? <MovieOverview overview={movie.overview} /> : <Skeleton count={10} />}
      {
        movie.id
          ? <Button className="add-wishlist" onClick={toggleWishlist}>
              <i aria-hidden className={cn('fa-heart', { fas: inWishlist, far: !inWishlist })} /> {inWishlist ? 'Remove from' : 'Add to'} Wishlist
            </Button>
          : <Skeleton className="add-wishlist" height={60} />
      }
    </div>
  </aside>
);

export default Aside;
