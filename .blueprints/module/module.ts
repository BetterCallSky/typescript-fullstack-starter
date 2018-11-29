import * as Rx from 'rx';
import { createEpic, createReducer } from 'typeless';
import { State } from 'src/types';
import { {{name}}State } from './types';
import { {{name}}Actions } from './actions';

// --- Epic ---
export const epic = createEpic<State>('{{name}}')

// --- Reducer ---
const initialState: {{name}}State = {
};

export const reducer = createReducer(initialState)