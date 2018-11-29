import * as React from 'react';
import * as R from 'r';
import { createConnect } from 'typeless';
import { State } from 'src/types';
import { {{name}}Actions } from '../actions';

export const {{name}}View = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.{{camelCase name}}, []),
  }))
  .pick({{name}}Actions, [])
  .sfc(props => { 
    return (
      <div>
        {{name}}View
      </div>
    );
  });
