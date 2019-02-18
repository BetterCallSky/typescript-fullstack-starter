import * as Rx from 'rx';
import { createEpic, createReducer, ModuleLoader } from 'typeless';
import { State } from 'src/types';
import { SampleModuleActions, MODULE, SampleModuleState } from './interface';
import React from 'react';
import { SampleModuleView } from './components/SampleModuleView';

// --- Epic ---
export const epic = createEpic<State>(MODULE).on(
  SampleModuleActions.test,
  () => {
    console.log('cb');
    return Rx.mergeObs(
      Rx.of(SampleModuleActions.test2()),
      Rx.of(SampleModuleActions.delayed()).pipe(
        Rx.delay(5000),
        Rx.tap(() => {
          console.log('delay d');
        })
      )
    );
  }
);
// .on(SampleModuleActions.test, () => {
//   return RouterActions.push('/' + Date.now());
// });
// .onMany(
//   [SampleModuleActions.mounted, SampleModuleActions.remounted],
//   (_, { action$ }) => {
//     const type = 'a';
//     return new Rx.Observable(subscriber => {
//       subscriber.next({ type: 'init: ' + type });
//       const intervalId = setInterval(() => {
//         subscriber.next({ type: 'next: ' + type });
//       }, 1000);
//       return () => {
//         console.log('remove: ' + type);
//         clearInterval(intervalId);
//       };
//     }).pipe(
//       Rx.takeUntil(action$.pipe(Rx.ofType(SampleModuleActions.remounted)))
//     );
//   }
// );

// --- Reducer ---
const initialState: SampleModuleState = {
  bar: 125,
};

export const reducer = createReducer(initialState).on(
  SampleModuleActions.test,
  state => {
    state.bar = Date.now();
  }
);

// --- Module ---
export default () => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['sampleModule']}
    actions={SampleModuleActions}
  >
    <SampleModuleView />
  </ModuleLoader>
);
