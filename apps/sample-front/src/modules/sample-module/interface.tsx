import { createActions } from 'typeless';
import { RouteConfig } from 'src/types';
import React from 'react';

// --- Constants ---
export const MODULE = 'SampleModule';

// --- Actions ---
export const SampleModuleActions = createActions(MODULE, {
  mounted: null,
  remounted: null,
  test: null,
  test2: null,
  delayed: null,
});

// --- Routing ---
const SampleLoader = React.lazy(() => import('./module'));

const SampleRoute = () => (
  <React.Suspense fallback={<div />}>
    <SampleLoader />
  </React.Suspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: true,
  path: '/',
  exact: true,
  component: <SampleRoute />,
};

// --- Types ---
export interface SampleModuleState {
  bar: number;
}

declare module 'src/types' {
  export interface State {
    sampleModule: SampleModuleState;
  }
}
