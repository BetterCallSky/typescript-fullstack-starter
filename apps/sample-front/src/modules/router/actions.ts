import { RouterLocation } from './types';
import { createActions } from 'typeless';
import { MODULE } from './const';

export const RouterActions = createActions(MODULE, {
  locationChange: (data: RouterLocation) => ({
    payload: data,
  }),
});
