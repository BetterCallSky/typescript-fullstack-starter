import * as React from 'react';
import * as R from 'r';
import { useActions, useMappedState } from 'typeless';
import { SampleModuleActions } from '../interface';

export const SampleModuleView = () => {
  const { bar } = useMappedState(state => ({
    ...R.pick(state.sampleModule, ['bar']),
  }));
  const { test } = useActions(SampleModuleActions);
  return (
    <div>
      bar34fccccvvb : {bar} <br />
      <input type="text" />
      <button onClick={test}>click</button>
    </div>
  );
};
