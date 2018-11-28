// interface CreateLoaderOptions<TState, TPathA extends keyof TState> {
//   component: any;
//   epic: EpicChain<TState, any>;
//   reducer: ChainedReducer<TState[TPathA]>;
//   reducerPath: [TPathA];
// }

// interface CreateLoaderOptions2<
//   TState,
//   TPathA extends keyof TState,
//   TPathB extends keyof TState[TPathA]
// > {
//   component: any;
//   epic: EpicChain<TState, any>;
//   reducer: ChainedReducer<TState[TPathA][TPathB]>;
//   reducerPath: [TPathA, TPathB];
// }

// export function createLoader<TState, TPathA extends keyof TState>(
//   options: CreateLoaderOptions<TState, TPathA>
// ): React.ComponentClass;
// export function createLoader<
//   TState,
//   TPathA extends keyof TState,
//   TPathB extends keyof TState[TPathA]
// >(options: CreateLoaderOptions2<TState, TPathA, TPathB>): React.ComponentClass;

// // export function createLoader(options: any) {
// //   class CreateLoader extends React.PureComponent {
// //     componentWillMount() {
// //       console.log('mounts');
// //     }

// //     render() {
// //       const { store } = this.context;
// //       console.log({ store });
// //       const Component = options.component;
// //       return (
// //         <div>
// //           loaded <Component />
// //         </div>
// //       );
// //     }
// //   }
// //   CreateLoader.contextTypes = {
// //     store: PropTypes.object.isRequired,
// //   };
// //   return CreateLoader;
// // }
