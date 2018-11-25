import React from 'react';
import { hot } from 'react-hot-loader';
import { Routes } from 'src/routes';

export class Root_ extends React.Component {
  render() {
    return <Routes />;
  }
}

export const Root = hot(module)(Root_);
