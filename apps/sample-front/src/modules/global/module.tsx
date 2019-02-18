import { createEpic, createReducer, ModuleLoader } from 'typeless';
import { State } from 'src/types';
import { GlobalState, GlobalActions } from './interface';
import React from 'react';

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

// --- Module ---
export default () => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['global']}
    actions={GlobalActions}
  />
);
