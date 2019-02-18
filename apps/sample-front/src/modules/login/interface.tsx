import React from 'react';
import { createActions } from 'typeless';
import { RouteConfig } from 'src/types';
import { LoginFormState } from './login-form';

// --- Constants ---
export const MODULE = 'Login';

// --- Actions ---
export const LoginActions = createActions(MODULE, {
  loaded: null,
  unloaded: null,
  replaced: null,
  setLoading: (isLoading: boolean) => ({ payload: { isLoading } }),
  setError: (error: string) => ({ payload: { error } }),
});

// --- Routing ---
const SampleLoader = React.lazy(() => import('./module'));

const LoginRoute = () => (
  <React.Suspense fallback={<div />}>
    <SampleLoader />
  </React.Suspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: false,
  path: '/',
  component: <LoginRoute />,
};

// --- Types ---
export interface LoginState {
  isLoading: boolean;
  error: string;
  form: LoginFormState;
}

declare module 'src/types' {
  export interface State {
    login: LoginState;
  }
}
