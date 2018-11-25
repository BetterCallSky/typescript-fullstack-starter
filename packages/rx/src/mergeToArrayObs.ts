import { Observable, merge } from 'rxjs';
import { toArray } from 'rxjs/operators';

export const mergeToArrayObs = <T>(args: Array<Observable<T>>) =>
  merge(...args).pipe(toArray());
