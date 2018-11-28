import * as Rx from 'rx';
import { createEpic, createReducer, createActions } from 'typeless';
import { State } from 'src/types';
import { SampleModuleState } from './types';

const MODULE = 'SampleModule';

// --- Actions ---
export const SampleModuleActions = createActions(MODULE, {
  test: null,
  test2: null,
  delayed: null,
});

// --- Epic ---
export const epic = createEpic<State>(MODULE).on(
  SampleModuleActions.test,
  () => {
    console.log('c');
    return Rx.mergeObs(
      Rx.of(SampleModuleActions.test2()),
      Rx.of(SampleModuleActions.delayed()).pipe(Rx.delay(5000))
    );
  }
);

// --- Reducer ---
const initialState: SampleModuleState = {
  bar: 125,
};

export const reducer = createReducer(initialState).on(
  SampleModuleActions.test,
  state => {
    state.bar = Date.now();
  }
);
