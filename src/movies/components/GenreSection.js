import React from 'react';
import Skeleton from 'react-loading-skeleton';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieItem, { MovieItemSkeleton } from './MovieItem';
import Container from '../../core/components/Container';

SwiperCore.use([Navigation]);

export const GenreSectionSkeleton = () => (
  <div className="genre-section skeleton">
    <div className="genre-title"><Skeleton width={100} /></div>
    <div className="genre-movies">
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
      <MovieItemSkeleton />
    </div>
  </div>
)

export default function GenreSection({ genre }) {
  return (
    <div className="genre-section">
      <Container>
        <h2 className="genre-title">{genre.name}</h2>
      </Container>

      <Swiper
        className="genre-movies"
        navigation
        centeredSlides={true}
        spaceBetween={8}
        slidesPerGroup={1}
        slidesPerView={1}
        breakpoints={{
          600: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          900: {
            slidesPerView: 3,
            centeredSlides: false,
            slidesOffsetBefore: 32
          },
          1200: {
            slidesPerView: 6,
            centeredSlides: false,
            slidesOffsetBefore: 32
          }
        }}
      >
        {genre.movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieItem movie={movie} genre={(genre.name || "").toLowerCase()} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}