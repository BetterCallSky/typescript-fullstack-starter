import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from 'redux';
import {
  createEpicMiddleware,
  createRootEpic,
  createRootReducer,
  TypelessContext,
  onHmr,
} from 'typeless';
import RouterModule from './modules/router/RouterModule';

const MOUNT_NODE = document.getElementById('root');

const rootEpic = createRootEpic();
const rootReducer = createRootReducer();

const epicMiddleware = createEpicMiddleware<any, any>(rootEpic);
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
  rootReducer,
  {},
  compose(applyMiddleware(...middleware))
);

const context = { rootEpic, rootReducer, store };

const render = () => {
  try {
    const App = require('./components/App').App;
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    ReactDOM.render(
      <Provider store={store}>
        <TypelessContext.Provider value={context}>
          <RouterModule>
            <App />
          </RouterModule>
        </TypelessContext.Provider>
      </Provider>,
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
