import * as Rx from 'rx';
import { createEpic, createReducer, useModule, batchUpdate } from 'typeless';
import { State } from 'src/types';
import { LoginState, MODULE, LoginActions } from './interface';
import {
  loginFormEpic,
  loginFormReducer,
  LoginFormActions,
} from './login-form';
import { GlobalActions } from '../global/interface';
import { RouterActions } from '../router/interface';
import React from 'react';
import { LoginView } from './components/LoginView';

const login = (username: string, password: string) =>
  Rx.of(null).pipe(
    Rx.delay(300),
    Rx.mergeMap(() => {
      if (username === 'user' && password == 'pass') {
        return Rx.of({ user: { id: 'a', username: 'user' }, token: '123' });
      }
      throw new Error('Invalid username or password');
    })
  );

// --- Epic ---
export const epic = createEpic<State>(MODULE)
  .attach(loginFormEpic)
  .on(LoginFormActions.setSubmitSucceeded, (_, { getState }) => {
    const { values } = getState().login.form;
    return Rx.concatObs(
      Rx.of(LoginActions.setLoading(true)),
      Rx.of(LoginActions.setError('')),
      login(values.username, values.password).pipe(
        Rx.map(({ user, token }) => {
          return batchUpdate([
            GlobalActions.loggedIn(user),
            RouterActions.push('/'),
          ]);
        }),
        Rx.catchLog(e => Rx.of(LoginActions.setError(e.message)))
      ),
      Rx.of(LoginActions.setLoading(false))
    );
  });

// --- Reducer ---
const initialState: LoginState = {
  isLoading: false,
  error: '',
  form: undefined,
};

export const reducer = createReducer(initialState)
  .on(LoginActions.setLoading, (state, { isLoading }) => {
    state.isLoading = isLoading;
  })
  .on(LoginActions.setError, (state, { error }) => {
    state.error = error;
  })
  .attach('form', loginFormReducer);

// --- Module ---
export default () => {
  useModule({
    epic,
    reducer,
    reducerPath: ['login'],
    actions: LoginActions,
  });
  return <LoginView />;
};
