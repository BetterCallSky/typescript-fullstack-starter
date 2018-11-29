export interface {{name}}State {
}

declare module 'src/types' {
  export interface State {
    {{camelCase name}}: {{name}}State;
  }
}
