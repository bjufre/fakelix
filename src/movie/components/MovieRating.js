import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function MovieRating({ votes, voteCount }) {
  if (votes && votes >= 0) {
    return (
      <h2 className="movie-votes">
        <i aria-hidden className="fas fa-star" /> {votes}
        <small>
          <span>({voteCount} votes)</span>
        </small>
      </h2>
    );
  }

  return <Skeleton width={80} />
}