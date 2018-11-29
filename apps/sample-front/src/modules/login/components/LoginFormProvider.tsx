import { State } from 'src/types';
import { LoginFormActions } from '../login-form';
import { createFormProvider } from 'redux-form';

export const LoginFormProvider = createFormProvider(
  (state: State) => ({
    form: state.login.form,
  }),
  LoginFormActions
);
