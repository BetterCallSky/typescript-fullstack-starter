import {
  useDispatch,
  useMappedState as _useMappedState,
} from 'redux-react-hook';
import { useMemo, useCallback } from 'react';
import { AnyActionCreator, DefaultState } from './types';

export function useActions<T extends { [x: string]: AnyActionCreator }>(
  actionCreators: T
): T {
  const dispatch = useDispatch();
  const names = Object.keys(actionCreators);
  return useMemo(
    () =>
      names.reduce(
        (mapped, key) => {
          mapped[key] = (...args: any[]) => {
            const action = actionCreators[key](...args);
            dispatch(action);
            return action;
          };
          return mapped;
        },
        {} as T
      ),
    names
  );
}

export function useMappedState<R, T = DefaultState>(
  fn: (state: T) => R,
  deps?: any[]
) {
  const mapState = useCallback(fn, deps || []);
  return _useMappedState(mapState);
}
