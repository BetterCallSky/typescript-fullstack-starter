import * as React from 'react';
import * as R from 'r';
import { createConnect } from 'typeless';
import { State } from 'src/types';
import { SampleModuleActions } from '../actions';

export const SampleModuleView = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.sampleModule, ['bar']),
  }))
  .pick(SampleModuleActions, ['test'])
  .sfc(props => {
    const { test, bar } = props;
    return (
      <div>
        bar34fccccvvb : {bar} <br />
        <input type="text" />
        <button onClick={test}>click</button>
      </div>
    );
  });
