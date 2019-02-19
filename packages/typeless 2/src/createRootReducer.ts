import { AnyAction } from 'redux';
import { withBatch } from './withBatch';
import { RootReducer } from './types';

type AnyObject = {
  [x: string]: any;
};

function addAtPath(obj: AnyObject, value: any, path: string[]) {
  const [current, ...rest] = path;
  if (rest.length) {
    if (!obj[current]) {
      obj[current] = {};
    }
    addAtPath(obj[current], value, rest);
  } else {
    obj[current] = value;
  }
}

function removeAtPath(obj: AnyObject, path: string[]) {
  const [current, ...rest] = path;
  if (rest.length) {
    if (!obj[current]) {
      return;
    }
    removeAtPath(obj[current], rest);
  } else {
    delete obj[current];
  }
}

function applyReducerTree(
  state: AnyObject,
  tree: AnyObject,
  action: AnyAction
) {
  let newState = state;
  let isModified = false;
  const updateState = (key: string, newSubState: AnyObject) => {
    if (newState[key] === newSubState) {
      return;
    }
    if (!isModified) {
      isModified = true;
      newState = { ...state };
    }
    newState[key] = newSubState;
  };
  Object.keys(tree).map(key => {
    if (typeof tree[key] === 'function') {
      const subReducer = tree[key];
      updateState(key, subReducer(state[key], action));
    } else {
      const subState = state[key] === undefined ? {} : state[key];
      updateState(key, applyReducerTree(subState, tree[key], action));
    }
  });
  return newState;
}

export const createRootReducer = <TState>() => {
  const tree: AnyObject = {};
  const rootReducer = (withBatch((state: TState, action: AnyAction) => {
    return applyReducerTree(state, tree, action);
  }) as any) as RootReducer<TState>;
  rootReducer.addReducer = (reducer, path) => {
    addAtPath(tree, reducer, path);
  };
  rootReducer.removeReducer = path => {
    removeAtPath(tree, path);
  };
  return rootReducer;
};
