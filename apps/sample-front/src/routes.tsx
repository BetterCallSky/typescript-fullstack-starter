import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

const SampleModuleLoader = React.lazy(() =>
  import('./modules/sample-module/SampleModuleLoader')
);

const LoginLoader = React.lazy(() => import('./modules/login'));

const Index = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <SampleModuleLoader />
  </React.Suspense>
);

const LoginRoute = () => (
  <React.Suspense fallback={<div />}>
    <LoginLoader />
  </React.Suspense>
);

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Index} exact />
      <Route path="/login" component={LoginRoute} />
      <Redirect path="*" to="/" />
    </Switch>
  );
};
