import { createEpic, createReducer, createActions } from 'typeless';
import { State } from 'src/types';
import { SampleModuleState } from './types';

const MODULE = 'SampleModule';

// --- Actions ---
export const SampleModuleActions = createActions(MODULE, {});

// --- Epic ---
export const epic = createEpic<State>(MODULE);

// --- Reducer ---
const initialState: SampleModuleState = {
  bar: 123,
};

export const reducer = createReducer(initialState);
