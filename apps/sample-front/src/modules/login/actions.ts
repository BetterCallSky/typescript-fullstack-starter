import { createActions } from 'typeless';

export const LoginActions = createActions('Login', {
  loaded: null,
  unloaded: null,
  replaced: null,
  setLoading: (isLoading: boolean) => ({ payload: { isLoading } }),
  setError: (error: string) => ({ payload: { error } }),
});
