import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

const SampleModuleLoader = React.lazy(() =>
  import('./modules/sample-module/SampleModuleLoader')
);

const Index = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <SampleModuleLoader />
  </React.Suspense>
);

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Index} exact />
      <Redirect path="*" to="/" />
    </Switch>
  );
};
