import React from 'react';

export default function MovieImage({ movie, poster }) {
  return (
    <div className="movie-item-image">
      <img src={`https://image.tmdb.org/t/p/w500${poster ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
    </div>
  )
}