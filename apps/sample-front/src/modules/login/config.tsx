import React from 'react';
import { RouteConfig } from 'src/types';

const SampleLoader = React.lazy(() => import('./loader'));

const LoginRoute = () => (
  <React.Suspense fallback={<div />}>
    <SampleLoader />
  </React.Suspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: false,
  path: '/login',
  component: <LoginRoute />,
};
