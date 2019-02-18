import { createEpic, createReducer, useModule } from 'typeless';
import { State } from 'src/types';
import { GlobalState, GlobalActions } from './interface';

// --- Epic ---
export const epic = createEpic<State>('Global');

// --- Reducer ---
const initialState: GlobalState = {
  isLoaded: false,
  user: null,
};

export const reducer = createReducer(initialState).on(
  GlobalActions.loggedIn,
  (state, { user }) => {
    state.user = user;
  }
);

// --- Module ---
export const useGlobalModule = () =>
  useModule({
    epic,
    reducer,
    reducerPath: ['global'],
    actions: GlobalActions,
  });
