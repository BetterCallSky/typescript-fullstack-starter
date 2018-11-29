import * as React from 'react';
import * as R from 'r';
import { createConnect } from 'typeless';
import { State } from 'src/types';
import { LoginActions } from '../actions';

export const LoginView = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.login, []),
  }))
  .pick(LoginActions, [])
  .sfc(props => { 
    return (
      <div>
        LoginView
      </div>
    );
  });
