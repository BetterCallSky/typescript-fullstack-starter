import { createReducer, createEpic } from 'typeless';
import { RouterState } from './types';
import { RouterActions } from './actions';
import { MODULE } from './const';
import { State } from 'src/types';

// --- Reducer ---
const initialState: RouterState = {
  location: null,
  prevLocation: null,
};

// --- Epic ---
export const epic = createEpic<State>(MODULE);

export const reducer = createReducer(initialState).on(
  RouterActions.locationChange,
  (state, payload) => {
    state.prevLocation = state.location;
    state.location = payload;
  }
);
