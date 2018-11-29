import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { App } from './App';

export class Root_ extends React.Component {
  render() {
    return <App />;
  }
}
setConfig({ pureSFC: true, pureRender: true });

export const Root = hot(module)(Root_);
