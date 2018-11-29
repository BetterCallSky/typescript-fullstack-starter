import { createActions } from 'typeless';

export const LoginActions = createActions('Login', {
  loaded: null,
  unloaded: null,
  replaced: null,
});
