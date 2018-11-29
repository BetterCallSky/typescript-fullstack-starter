import { LoginFormState } from './login-form';

export interface LoginState {
  isLoading: boolean;
  error: string;
  form: LoginFormState;
}

declare module 'src/types' {
  export interface State {
    login: LoginState;
  }
}
