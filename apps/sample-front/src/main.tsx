import * as React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore as createReduxStore } from 'redux';
import {
  createEpicMiddleware,
  RootEpic,
  RootReducer,
  onHmr,
  TypelessProvider,
} from 'typeless';

const MOUNT_NODE = document.getElementById('root');

const rootEpic = new RootEpic();
const rootReducer = new RootReducer();

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = [epicMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger').createLogger;
  middleware.push(
    createLogger({
      collapsed: true,
    })
  );
}
const store = createReduxStore(
  rootReducer.getReducer(),
  {},
  applyMiddleware(...middleware)
);

const render = () => {
  try {
    const App = require('./components/App').App;
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    ReactDOM.render(
      <TypelessProvider
        store={store}
        rootEpic={rootEpic}
        rootReducer={rootReducer}
      >
        <App />
      </TypelessProvider>,
      MOUNT_NODE
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    }
    throw error;
  }
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    onHmr(render);
  });
}
render();
