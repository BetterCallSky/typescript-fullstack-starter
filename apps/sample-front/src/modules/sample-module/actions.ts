import { MODULE } from './const';
import { createActions } from 'typeless';

export const SampleModuleActions = createActions(MODULE, {
  loaded: null,
  unloaded: null,
  replaced: null,
  test: null,
  test2: null,
  delayed: null,
});
