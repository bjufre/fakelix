import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';


/**
 * This functions gets the observable of actions from the store
 * and a list of actions that we subscribe to in order to
 * cancel any ajax requests.
 * This works by merging any `action$` with the correct `ofType`.
 */
export default (action$, ...actions) => {
  const toCancel = actions.map(action =>
    action$.pipe(ofType(action))
  );

  return merge(...toCancel);
};