import { ReduxForm, FormState } from 'redux-form';
import { State } from 'src/types';

interface LoginFormValues {
  username: string;
  password: string;
}

const { actions, reducer, epic } = new ReduxForm<LoginFormValues, State>(
  'login',
  state => state.login.form
)
  .addValidator(values => {
    const errors: any = {};
    if (!values.username) {
      errors.username = 'Please enter username!';
    }
    if (!values.password) {
      errors.password = 'Please enter password!';
    }
    return errors;
  })
  .build();

export const LoginFormActions = actions;
export const loginFormReducer = reducer;
export const loginFormEpic = epic;
export type LoginFormState = FormState<LoginFormValues>;
