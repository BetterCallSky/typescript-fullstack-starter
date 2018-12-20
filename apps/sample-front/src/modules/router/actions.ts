import { RouterLocation } from './types';
import { createActions } from 'typeless';
import { MODULE } from './const';
import { LocationDescriptor } from 'history';

export const RouterActions = createActions(MODULE, {
  mounted: null,
  locationChange: (data: RouterLocation) => ({
    payload: data,
  }),
  push: <S = any>(location: LocationDescriptor<S>) => ({
    payload: location,
  }),
  replace: <S = any>(location: LocationDescriptor<S>) => ({
    payload: location,
  }),
});
