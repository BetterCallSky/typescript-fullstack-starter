export interface LoginState {
  isSubmitting: boolean;
}

declare module '../../types' {
  export interface State {
    login: LoginState;
  }
}
