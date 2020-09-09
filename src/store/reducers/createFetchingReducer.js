import { LOCATION_CHANGE } from "../actions/index";


export default ([requestAction, successAction, failureAction], initial = false) => {
  return function isFetching(state = initial, action) {
    switch (action.type) {
      case requestAction:
        return true;
      case successAction:
      case failureAction:
      case LOCATION_CHANGE:
        return false;
      default:
        return state;
    }
  }
}
