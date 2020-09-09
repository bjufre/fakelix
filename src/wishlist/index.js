import React, { useCallback, useMemo } from 'react';

import useWishlist from '../core/hooks/useWishlist';
import MovieImage from '../core/components/MovieImage';
import Container from '../core/components/Container';
import MovieItem from '../movies/components/MovieItem';

function WishlistItem({ movie, toggleMovie }) {
  const toggle = useCallback(() => {
    toggleMovie(movie.id, true);
  }, [toggleMovie]);
  const genre = useMemo(() => {
    if (movie.genre) return (movie.genre.name || '').toLowerCase();
    const [genre] = movie.genres;
    return genre ? genre.name.toLowerCase() : 'unknown';
  }, [movie])

  return (
    <MovieItem movie={movie} genre={genre} single>
      <div className="wish-action" onClick={toggle}>
        <small>
          <i aria-hidden className="fa-trash fas" /> Remove
        </small>
      </div>
    </MovieItem>
  );
}

export default function Wishlist(props) {
  const { wishlist, toggleWishlistMovie } = useWishlist();

  return (
    <Container className="wishlists">
      <h1>Wishlist</h1>
      <div id="movies-list">
        {
          !wishlist.length
            ? <p>No movies saved yet.</p>
            : (wishlist || []).map(movie => (
              <WishlistItem key={movie.id} movie={movie} toggleMovie={toggleWishlistMovie} />
            ))
        }
      </div>
    </Container>
  );
}
