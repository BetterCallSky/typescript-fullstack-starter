import * as React from 'react';
import * as R from 'r';
import { createConnect } from 'typeless';
import { State } from 'src/types';

export const SampleModuleView = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.sampleModule, ['bar']),
  }))
  .sfc(props => {
    const { bar } = props;
    return <div>SampleModuleView {bar} </div>;
  });
