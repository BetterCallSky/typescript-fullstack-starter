import { MODULE } from './const';
import { createActions } from 'typeless';

export const SampleModuleActions = createActions(MODULE, {
  mounted: null,
  remounted: null,
  test: null,
  test2: null,
  delayed: null,
});
