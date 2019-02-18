import { waitForType, ofType } from 'typeless';
import { fromPromise } from 'rxjs/internal-compatibility';

export interface Action {
  type: any;
}
export {
  Subject,
  forkJoin,
  empty,
  of,
  timer,
  from,
  defer,
  Observable,
  interval,
  concat as concatObs,
  merge as mergeObs,
  race as raceObs,
  throwError as throwObs,
} from 'rxjs';

export interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

export { ajax } from 'rxjs/ajax';

export * from 'rxjs/operators';
export * from './src/catchLog';
export * from './src/log';
export * from './src/mergeToArrayObs';
export * from './src/waitForTypeIf';

export { fromPromise };

export { ofType, waitForType };
