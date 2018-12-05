import * as Rx from 'rx';
import { createEpic, createReducer } from 'typeless';
import { State } from 'src/types';
import { GlobalState } from './types';
import { GlobalActions } from './actions';

// --- Epic ---
export const epic = createEpic<State>('Global');

// --- Reducer ---
const initialState: GlobalState = {
  isLoaded: false,
  user: null,
};

export const reducer = createReducer(initialState).on(
  GlobalActions.loggedIn,
  (state, { user }) => {
    state.user = user;
  }
);
