import { Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { AnyAction, Reducer } from 'redux';
import { StateObservable } from './StateObservable';

export type AnyActionCreator = (...args: any[]) => any;

export type ActionLike = { type?: string; payload?: any; meta?: any };

export type AC = (...args: any[]) => any;

export type EpicResult = Observable<ActionLike> | ActionLike | ActionLike[];

export type ExtractPayload<T> = T extends { payload: infer P } ? P : null;

export interface Deps<TState> {
  getState: () => TState;
  action$: Observable<AnyAction>;
  state$: StateObservable<TState>;
}

export type EpicHandler<TAC extends AC, TState> = (
  payload: ExtractPayload<ReturnType<TAC>>,
  deps: Deps<TState>,
  action: ReturnType<TAC> & { type: string }
) => EpicResult;

export type EpicOperator = <T, R>(
  project: (value: T, index: number) => ObservableInput<R>
) => OperatorFunction<T, R>;

export type Flatten<T> = { [K in keyof T]: T[K] };

export type HandlerFn<TState> = (
  deps: Deps<TState>
) => (action: AnyAction) => Observable<EpicResult>;

export interface EpicChain<TState = DefaultState> {
  epicName: string;
  attach(epic: EpicChain<TState>): this;
  getHandlers(): { [x: string]: Array<HandlerFn<TState>> };
  on<TAC extends AC>(ac: TAC, handler: EpicHandler<TAC, TState>): this;
  onMany<TAC extends AC, TAC2 extends AC>(
    ac: [TAC, TAC2],
    handler: EpicHandler<TAC | TAC2, TState>
  ): this;
  onMany<TAC extends AC, TAC2 extends AC, TAC3 extends AC>(
    ac: [TAC, TAC2, TAC3],
    handler: EpicHandler<TAC | TAC2 | TAC3, TState>
  ): this;
  onMany<TAC extends AC, TAC2 extends AC, TAC3 extends AC, TAC4 extends AC>(
    ac: [TAC, TAC2, TAC3, TAC4],
    handler: EpicHandler<TAC | TAC2 | TAC3 | TAC4, TState>
  ): this;
  onMany<
    TAC extends AC,
    TAC2 extends AC,
    TAC3 extends AC,
    TAC4 extends AC,
    TAC5 extends AC
  >(
    ac: [TAC, TAC2, TAC3, TAC4, TAC5],
    handler: EpicHandler<TAC | TAC2 | TAC3 | TAC4 | TAC5, TState>
  ): this;
}

export interface RootReducer<TState = DefaultState> {
  (state: TState, action: AnyAction): TState;
  addReducer(reducer: Reducer<any>, path: string[]): void;
  removeReducer(path: string[]): void;
}

export type AnyFn = (...args: any[]) => any;

export type ConvertAC<T> = false extends T
  ? () => {}
  : T extends AnyFn
  ? T
  : () => {};

export type ConvertActions<T> = { [P in keyof T]: ConvertAC<T[P]> };

export type Nullable<T> = T | null;

export type ActionMap = { [name: string]: Nullable<(...args: any[]) => {}> };

export interface DefaultState {
  //
}
