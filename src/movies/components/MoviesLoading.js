import React from 'react';
import { GenreSectionSkeleton } from './GenreSection';

export default function MoviesLoading() {
  return (
    <>
      <GenreSectionSkeleton />
      <GenreSectionSkeleton />
      <GenreSectionSkeleton />
    </>
  );
}