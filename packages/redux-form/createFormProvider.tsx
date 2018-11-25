import * as React from 'react';
import { createConnect } from 'typeless';
import { FormContext } from './FormContext';

export function createFormProvider<
  S,
  A extends {
    blur: (...args: any[]) => any;
    change: (...args: any[]) => any;
  }
>(mapState: (state: S) => { form: any }, actions: A) {
  return createConnect<S>()
    .external<{ children: React.ReactNode }>()
    .mapState(mapState)
    .actions(actions)
    .sfc(props => {
      const { form, blur, change, children } = props;
      return (
        <FormContext.Provider
          value={Object.assign({}, form, {
            actions: { blur, change },
          })}
        >
          {children}
        </FormContext.Provider>
      );
    });
}
