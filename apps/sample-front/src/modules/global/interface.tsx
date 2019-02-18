import { createActions } from 'typeless';
import { User } from 'src/types';

// --- Constants ---
export const MODULE = 'Global';

// --- Actions ---
export const GlobalActions = createActions('Global', {
  loaded: null,
  unloaded: null,
  replaced: null,
  loggedIn: (user: User) => ({ payload: { user } }),
});

// --- Types ---
export interface GlobalState {
  isLoaded: boolean;
  user: User;
}

declare module 'src/types' {
  export interface State {
    global: GlobalState;
  }
}
