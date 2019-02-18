import { Observable, ObservableInput } from 'rxjs';

import { catchError } from 'rxjs/operators';

export const catchLog = <T, R extends ObservableInput<any>>(
  fn: (err: Error, source: Observable<T>) => R
) =>
  catchError<T, R>((err: Error, source: Observable<T>) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
    }
    return fn(err, source);
  });
