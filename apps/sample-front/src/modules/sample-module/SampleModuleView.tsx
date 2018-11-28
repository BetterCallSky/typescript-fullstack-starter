import * as React from 'react';
import * as R from 'r';
import { createConnect } from 'typeless';
import { State } from 'src/types';
import { SampleModuleActions } from './module';

export const SampleModuleView = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.sampleModule, ['bar']),
  }))
  .pick(SampleModuleActions, ['test'])
  .sfc(props => {
    const { test, bar } = props;
    console.log({ bar });
    return (
      <div>
        bar: {bar} <br />
        <button onClick={test}>click</button>
      </div>
    );
  });
