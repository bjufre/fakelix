import { Observable, empty } from 'rxjs';
import { pluck, map, tap, expand, reduce, catchError } from 'rxjs/operators';

import buildUrl from './buildUrl';


const comicRequest = (endpoint, params = {}) => ({
  method: 'GET',
  crossDomain: true,
  url: buildUrl(endpoint, params),
});

const prepareRequest = (comicId, offset, [e, p]) => {
  const endpoint = `/comics/${e.replace(':id', comicId)}`;

  if (e === ':id') return comicRequest(endpoint, p);
  return comicRequest(endpoint, {...p, offset});
};

const createAjax = (comicId, ajax, req, sideFxFn, offset) =>
  ajax(prepareRequest(comicId, offset, req)).pipe(
    pluck('response'),
    pluck('data'),
    map(data => ({
      total: data.total,
      items: [...data.results]
    })),
    tap(sideFxFn)
  );

/**
 * This function is in charge of creating the necessary steps
 * to perform an ajax request that will ensure that we get back
 * all the data based on the "total" and "count" params
 * from the ajax response.
 *
 * It creates an Observable that we can subscribe to and perform
 * any transformation we see fit later on.
 */
export default (comicId, ajax) => (req) => {
  let total;
  let count = 0;
  let offset = 0;
  let finished = false

  const execute = createAjax.bind(this, comicId, ajax, req, (res) => {
    if (typeof total !== 'number') total = res.total;
    count = res.items.length + count;
    offset = count;
    finished = !(count < total);
  });

  return Observable.create(observer => {
    return execute(offset)
      .pipe(
        expand((data, idx) => finished ? empty() : execute(offset)),
        reduce((acc, result) => ([...acc, ...result.items]), []),
        catchError(error => observer.error(error))
      )
      .subscribe(response => {
        observer.next(response);
        observer.complete();
      })
  });
}
