import { AC, waitForType } from 'typeless';
import { Observable, of } from 'rxjs';

export interface Action {
  type: any;
}

export const waitForTypeIf = <T extends Action>(
  action$: Observable<T>,
  type: AC,
  fn: () => boolean
) => {
  if (fn()) {
    return of(null);
  }
  return action$.pipe(waitForType(type));
};
