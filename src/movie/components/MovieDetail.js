import React from 'react';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';

import Aside from './Aside';
import SEO from '../../core/components/SEO';
import Container from '../../core/components/Container';
import MovieImage from '../../core/components/MovieImage';


const MovieDetail = ({ movie, genre, inWishlist, toggleWishlist }) => (
  <>
    <SEO title={movie.title} description={movie.tagline} />
    <Container>
      <div className={cn("movie-detail", genre)}>
        <main>
          {movie.id ? <MovieImage poster movie={movie} /> : <Skeleton width={500} height={650} />}
        </main>
        <Aside genre={genre} movie={movie} inWishlist={inWishlist} toggleWishlist={toggleWishlist} />
      </div>
    </Container>
  </>
);

export default MovieDetail;
