import * as Rx from 'rx';
import { createActions, createReducer, Epic } from 'typeless';

type Validator<T, TState> = (
  data: T,
  state: TState
) => { [x in keyof T]?: string };

export type FormState<T> = {
  values: T;
  errors: { [x in keyof T]?: string };
  touched: { [x in keyof T]?: boolean };
};

type Selector<TData, TState> = (state: TState) => FormState<TData>;

export class ReduxForm<TData, TState = {}> {
  private name: string;
  private validator: Validator<TData, TState>;
  private selector: Selector<TData, TState>;

  constructor(name: string, selector: Selector<TData, TState>) {
    this.name = name;
    this.selector = selector;
  }

  addValidator(validator: Validator<TData, TState>) {
    this.validator = validator;
    return this;
  }

  build() {
    const form = this.name;
    const actions = createActions(`form_${form}`, {
      blur: (field: keyof TData) => ({ payload: { field }, meta: { form } }),
      focus: (field: keyof TData) => ({ payload: { field }, meta: { form } }),
      change: (field: keyof TData, value: TData[typeof field]) => ({
        payload: { field, value },
        meta: { form },
      }),
      changeMany: (values: Partial<TData>) => ({
        payload: { values },
        meta: { form },
      }),
      replace: (values: TData) => ({
        payload: { values },
        meta: { form },
      }),
      setErrors: (errors: { [x in keyof TData]?: string }) => ({
        payload: { errors },
      }),
      touchAll: null,
      submit: null,
      setSubmitSucceeded: null,
      setSubmitFailed: null,
      reset: null,
      resetTouched: null,
      validate: null,
    });
    const initialState: FormState<TData> = {
      values: {} as TData,
      errors: {},
      touched: {},
    };
    const epic = new Epic<TState>(`form_${form}`)
      .onMany(
        [
          actions.change,
          actions.blur,
          actions.changeMany,
          actions.replace,
          actions.validate,
        ],
        (_, { getState }) => {
          if (!this.validator) {
            return Rx.empty();
          }
          const state = this.selector(getState());
          return Rx.of(null).pipe(
            Rx.delay(0),
            Rx.map(() =>
              actions.setErrors(this.validator(state.values, getState()))
            )
          );
        }
      )
      .on(actions.submit, (_, { getState, action$ }) => {
        return Rx.concatObs(
          Rx.of(actions.validate()),
          action$.pipe(
            Rx.waitForType(actions.setErrors),
            Rx.map(() => {
              const state = this.selector(getState());
              const anyError = Object.values(state.errors).some(x => !!x);
              return anyError
                ? actions.setSubmitFailed()
                : actions.setSubmitSucceeded();
            })
          ),
          Rx.of(actions.touchAll())
        );
      });
    const reducer = createReducer(initialState)
      .on(actions.blur, (state, { field }) => {
        state.touched[field] = true;
      })
      .on(actions.change, (state, { field, value }) => {
        state.values[field] = value;
      })
      .on(actions.changeMany, (state, { values }) => {
        Object.assign({}, state.values, values);
      })
      .on(actions.replace, (state, { values }) => {
        state.values = values;
      })
      .on(actions.setErrors, (state, { errors }) => {
        state.errors = errors;
      })
      .on(actions.touchAll, state => {
        state.touched = Object.keys(state.errors).reduce(
          (ret, key) => {
            ret[key] = true;
            return ret;
          },
          {} as any
        );
      })
      .on(actions.resetTouched, state => {
        state.touched = {};
      })
      .on(actions.reset, () => {
        return initialState;
      });

    return { actions, reducer, initialState, epic };
  }
}
