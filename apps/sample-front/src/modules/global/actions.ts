import { createActions } from 'typeless';
import { User } from 'src/types';

export const GlobalActions = createActions('Global', {
  loaded: null,
  unloaded: null,
  replaced: null,
  loggedIn: (user: User) => ({ payload: { user } }),
});
