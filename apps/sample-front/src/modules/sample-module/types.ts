export interface SampleModuleState {
  bar: number;
}

declare module '../../types' {
  export interface State {
    sampleModule: SampleModuleState;
  }
}
