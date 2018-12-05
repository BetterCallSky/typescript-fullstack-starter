import * as R from 'r';
import React from 'react';
import { createConnect } from 'typeless';
import { State } from 'src/types';
import { Switch, Route, Redirect } from 'react-router';

const Dashboard = () => <div>Dashboard4b</div>;
const NotFound = () => <div>NotFound</div>;

const LoginLoader = React.lazy(() => import('src/modules/login'));

const LoginRoute = () => (
  <React.Suspense fallback={<div />}>
    <LoginLoader />
  </React.Suspense>
);

export const RouteResolver = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.global, ['isLoaded', 'user']),
    ...R.pick(state.router, ['location']),
  }))
  .sfc(props => {
    const { isLoaded, user } = props;
    // if (!isLoaded) {
    //   return null;
    // }
    if (user) {
      return (
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="*" component={NotFound} />
          {/* <Redirect path="*" to="/" /> */}
        </Switch>
      );
    }
    return (
      <Switch>
        <Route path="/login" component={LoginRoute} />
        <Redirect path="*" to="/login" />
      </Switch>
    );
  });
