import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
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
} from 'typeless';
import { Root } from './components/Root';
import RouterModule from './modules/router/RouterModule';

const MOUNT_NODE = document.getElementById('root');

const history = createHistory();
const rootEpic = createRootEpic();
const rootReducer = createRootReducer();

const epicMiddleware = createEpicMiddleware<any, any>(rootEpic);
const middleware = [epicMiddleware, routerMiddleware(history)];
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

ReactDOM.render(
  <Provider store={store}>
    <TypelessContext.Provider value={context}>
      <RouterModule>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </RouterModule>
    </TypelessContext.Provider>
  </Provider>,
  MOUNT_NODE
);
