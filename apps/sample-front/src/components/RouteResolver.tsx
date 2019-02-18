import * as R from 'r';
import React from 'react';
import { createConnect } from 'typeless';
import { State, RouteConfig } from 'src/types';
// import { Switch, Route, Redirect } from 'react-router';
// import LoginRoute from 'src/modules/login';

// const Dashboard = () => <div>Dashboard4b</div>;
// const NotFound = () => <div>NotFound</div>;

// const LoginLoader = React.lazy(() => import('src/modules/login'));
// const SampleLoader = React.lazy(() => import('src/modules/sample-module/loader'));

// const LoginRoute = () => (
//   <React.Suspense fallback={<div />}>
//     <LoginLoader />
//   </React.Suspense>
// );

// const SampleRoute = () => (
//   <React.Suspense fallback={<div />}>
//     <SampleLoader />
//   </React.Suspense>
// );

const req = require.context('../modules', true, /interface.tsx?$/);

const routes = R.flatMap(req.keys(), key => {
  const module = req(key);
  return Object.values(module).filter(
    (item: RouteConfig) => item.type === 'route'
  ) as RouteConfig[];
});
console.log(routes);

export const RouteResolver = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.global, ['isLoaded', 'user']),
    ...R.pick(state.router, ['location']),
  }))
  .sfc(props => {
    const { user, location } = props;
    console.log(location);
    // if (!isLoaded) {
    //   return null;
    // }

    const match = routes.find(route => {
      if ((route.auth && !user) || (!route.auth && user)) {
        return false;
      }
      return route.path === location.pathname;
    });
    console.log('render', match ? match.path : 'not found');
    if (match) {
      return match.component;
    }

    return (
      <div style={{ background: 'red', width: '100%', height: '100vh' }}>
        Not found
      </div>
    );
    // return <SampleRoute />;

    // if (user) {
    //   return <Dashboard />;
    // }
    // return <LoginRoute />;

    // if (user) {
    //   return (
    //     <Switch>
    //       <Route path="/" component={Dashboard} exact />
    //       <Route path="*" component={NotFound} />
    //       {/* <Redirect path="*" to="/" /> */}
    //     </Switch>
    //   );
    // }
    // return (
    //   <Switch>
    //     <Route path="/login" component={LoginRoute} />
    //     <Redirect path="*" to="/login" />
    //   </Switch>
    // );
  });
