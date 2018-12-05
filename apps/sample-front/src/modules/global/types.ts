import { User } from 'src/types';

export interface GlobalState {
  isLoaded: boolean;
  user: User;
}

declare module 'src/types' {
  export interface State {
    global: GlobalState;
  }
}
