import { createReducer, createEpic } from 'typeless';
import * as Rx from 'rx';
import { RouterState } from './types';
import { RouterActions } from './actions';
import { MODULE } from './const';
import { State } from 'src/types';
import { history } from '../../history';

// --- Reducer ---
const initialState: RouterState = {
  location: null,
  prevLocation: null,
};

// --- Epic ---
export const epic = createEpic<State>(MODULE)
  .on(
    RouterActions.mounted,
    () =>
      new Rx.Observable(subscriber => {
        subscriber.next(RouterActions.locationChange(history.location));
        return history.listen(location => {
          subscriber.next(RouterActions.locationChange(location));
        });
      })
  )
  .on(RouterActions.push, location => {
    history.push(location as any);
    return Rx.empty();
  })
  .on(RouterActions.replace, location => {
    history.replace(location as any);
    return Rx.empty();
  });

export const reducer = createReducer(initialState).on(
  RouterActions.locationChange,
  (state, payload) => {
    state.prevLocation = state.location;
    state.location = payload;
  }
);
