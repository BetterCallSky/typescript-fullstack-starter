import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Routes } from 'src/routes';

export class Root_ extends React.Component {
  render() {
    return <Routes />;
  }
}
setConfig({ pureSFC: true, pureRender: true });

export const Root = hot(module)(Root_);
