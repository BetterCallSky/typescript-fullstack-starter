import { createReducer, createEpic, useModule } from 'typeless';
import * as Rx from 'rx';
import { MODULE, RouterActions, RouterState } from './interface';
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

// --- Module ---
export const useRouterModule = () =>
  useModule({
    epic,
    reducer,
    reducerPath: ['router'],
    actions: RouterActions,
  });
