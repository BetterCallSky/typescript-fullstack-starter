// import * as React from 'react';
// import { Redirect, Route, Switch } from 'react-router';

// const SampleModuleLoader = React.lazy(() =>
//   import('./modules/sample-module/loader')
// );

// const LoginLoader = React.lazy(() => import('./modules/login/loader'));

// const Dummy = () => <div>dummy</div>;

// const Delay = React.lazy(
//   () =>
//     new Promise(resolve => {
//       setTimeout(() => {
//         const ret = {
//           default: Dummy,
//         } as never;
//         resolve(ret);
//       }, 5000);
//     })
// );

// const Index = () => (
//   <React.Suspense fallback={<div>Loading...</div>}>
//     <SampleModuleLoader />
//     <Delay />
//   </React.Suspense>
// );

// const LoginRoute = () => (
//   <React.Suspense fallback={<div />}>
//     <LoginLoader />
//   </React.Suspense>
// );

// export const Routes = () => {
//   return (
//     <Switch>
//       <Route path="/" component={Index} exact />
//       <Route path="/login" component={LoginRoute} />
//       <Redirect path="*" to="/" />
//     </Switch>
//   );
// };
