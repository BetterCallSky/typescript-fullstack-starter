import * as Rx from 'rx';
import { createEpic, createReducer } from 'typeless';
import { State } from 'src/types';
import { SampleModuleState } from './types';
import { MODULE } from './const';
import { SampleModuleActions } from './actions';

// --- Epic ---
export const epic = createEpic<State>(MODULE).on(
  SampleModuleActions.test,
  () => {
    console.log('fff');
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
// .onMany(
//   [SampleModuleActions.loaded, SampleModuleActions.replaced],
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
//       Rx.takeUntil(action$.pipe(Rx.ofType(SampleModuleActions.replaced)))
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
