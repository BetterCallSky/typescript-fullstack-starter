import React from 'react';
import RedBox from 'redbox-react';
import { cold } from 'react-hot-loader';

class ErrorBoundary_ extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <RedBox error={this.state.hasError} />;
    }

    return this.props.children;
  }
}

export const ErrorBoundary = cold(ErrorBoundary_);
