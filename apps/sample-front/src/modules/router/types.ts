// --- Types ---

export interface RouterLocation {
  hash: string;
  pathname: string;
  search: string;
  state?: object;
}

export interface RouterState {
  location: RouterLocation | null;
  prevLocation: RouterLocation | null;
}

declare module '../../types' {
  export interface State {
    router: RouterState;
  }
}
