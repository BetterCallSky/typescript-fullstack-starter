import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

export const catchLog = <T, R>(
  fn: (err: Error, source: Observable<T>) => Observable<R>
) =>
  catchError((err: Error, source: Observable<T>) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
    }
    return fn(err, source);
  });
