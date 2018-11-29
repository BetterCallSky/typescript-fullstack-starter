import * as Rx from 'rx';
import { createEpic, createReducer } from 'typeless';
import { State } from 'src/types';
import { LoginState } from './types';
import { LoginActions } from './actions';

// --- Epic ---
export const epic = createEpic<State>('Login')

// --- Reducer ---
const initialState: LoginState = {
};

export const reducer = createReducer(initialState)