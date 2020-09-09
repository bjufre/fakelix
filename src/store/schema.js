import { schema } from 'normalizr';


const VARIANTS = {
  fantastic: 'portrait_fantastic',
  uncanny: 'portrait_uncanny',
};

const NOT_FOUND = `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/${VARIANTS.uncanny}.jpg`;

const cleanTitle = title =>
  title.split(' ').slice(0, -2).join(' ');

const getYear = title =>
  title.match(/\(([\d,\w,\s,-]+)\)/)[1];

export const movie = new schema.Entity('movies', {});
export const genre = new schema.Entity('genres', {
  // movies: [movie], // NOTE: We could normalize this as well, but for sake of simplicity...
});
export const arrayOfGenres = new schema.Array(genre);
export const arrayOfMovies = new schema.Array(movie);
