export interface State {}

export interface User {
  id: string;
  username: string;
}

export type RouteConfig = {
  type: 'route';
  path: string;
  exact?: boolean;
  auth: boolean;
  component: React.ReactElement<any>;
};

declare module 'typeless/src/types' {
  export interface DefaultState extends State {}
}
