import { combineReducers, combineEpics } from 'typeless';
import { Reducer } from 'redux';
import { reducer as router } from './router';
import { State } from 'src/types';

export const reducer: Reducer<State> = combineReducers({
  router,
});

export const epic = combineEpics();
