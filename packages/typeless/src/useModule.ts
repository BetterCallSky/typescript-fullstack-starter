import { ChainedReducer } from './createReducer';
import React, { useEffect, useContext, useMemo } from 'react';
import { TypelessContext } from './TypelessContext';
import { Epic } from './Epic';
import { getIsHmr } from './onHmr';

type AnyActionCreator = (...args: any[]) => any;

interface BaseLoaderOptions<TState> {
  children?: React.ReactChild;
  epic: Epic<TState>;
  actions?: {
    mounted?: AnyActionCreator;
    unmounted?: AnyActionCreator;
    remounted?: AnyActionCreator;
    [x: string]: AnyActionCreator;
  };
}

export interface ModuleLoaderOptions<TState, TPathA extends keyof TState>
  extends BaseLoaderOptions<TState> {
  reducer: ChainedReducer<TState[TPathA]>;
  reducerPath: [TPathA];
}

export interface ModuleLoaderOptions2<
  TState,
  TPathA extends keyof TState,
  TPathB extends keyof TState[TPathA]
> extends BaseLoaderOptions<TState> {
  reducer: ChainedReducer<TState[TPathA][TPathB]>;
  reducerPath: [TPathA, TPathB];
}

export function useModule<
  TState,
  TPathA extends keyof TState,
  TPathB extends keyof TState[TPathA]
>(
  options:
    | ModuleLoaderOptions<TState, TPathA>
    | ModuleLoaderOptions2<TState, TPathA, TPathB>
) {
  const { epic, reducer, reducerPath, actions } = options;
  const { rootEpic, rootReducer, store } = useContext(TypelessContext);

  useMemo(() => {
    rootEpic.addEpic(epic);
    rootReducer.addReducer(reducer, reducerPath as string[]);

    if (getIsHmr()) {
      if (actions && actions.remounted) {
        store.dispatch(actions.remounted());
      }
    } else {
      store.dispatch({ type: '@@typeless/added' });
      if (actions && actions.mounted) {
        store.dispatch(actions.mounted());
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      rootEpic.removeEpic(epic.epicName);
      rootReducer.removeReducer(reducerPath as string[]);
      if (actions && actions.unmounted) {
        store.dispatch(actions.unmounted());
      }
    };
  }, []);
}
