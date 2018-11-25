import { createActions, createReducer } from 'typeless';

// --- Types ---
export interface RouterLocation {
  hash: string;
  pathname: string;
  search: string;
  state?: object;
}

export interface RouterState {
  location: RouterLocation | null;
  prevLocation: RouterLocation | null;
}

declare module '../types' {
  export interface State {
    router: RouterState;
  }
}

// --- Actions ---
export const RouterActions = createActions('@@router', {
  locationChange: (data: RouterLocation) => ({
    payload: data,
  }),
});

// --- Reducer ---
const initialState: RouterState = {
  location: null,
  prevLocation: null,
};

export const reducer = createReducer(initialState).on(
  RouterActions.locationChange,
  (state, payload) => {
    state.prevLocation = state.location;
    state.location = payload;
  }
);
