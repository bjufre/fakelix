import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";
import { removeWishlistMovie, addWishlistMovie } from "../../store/actions";
import * as fromById from '../../store/reducers/byId';

export default function useWishlist() {
  const dispatch = useDispatch();
  const ids = useSelector(state => state.wishlist);
  const wishlist = useSelector(state => {
    return (ids || []).map(id => fromById.getItem(state.movies, id));
  });
  const toggleWishlistMovie = (movieId, inWishlist) => {
    inWishlist
      ? dispatch(removeWishlistMovie(movieId))
      : dispatch(addWishlistMovie(movieId));
  };

  return {
    wishlist,
    toggleWishlistMovie,
  };
}