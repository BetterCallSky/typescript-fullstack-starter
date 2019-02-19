import { RootEpic } from './RootEpic';

export const createRootEpic = <TState>() => {
  return new RootEpic<TState>();
};
