import React from 'react';
import { RouteConfig } from 'src/types';

const SampleLoader = React.lazy(() => import('./loader'));

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
