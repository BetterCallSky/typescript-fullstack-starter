import * as React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { History } from 'history';
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

const MOUNT_NODE = document.getElementById('root');

const history = createHistory();

export const createApp = (root: React.ReactNode) => {
  const rootEpic = createRootEpic();
  const rootReducer = createRootReducer();
  const createStore = (history: History) => {
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

    return store;
  };
  const store = createStore(history);

  interface AppProps {
    history: any;
    store: Store<any>;
  }
  const context = { rootEpic, rootReducer, store };
  class App_ extends React.PureComponent<AppProps> {
    render() {
      const { history, store } = this.props;
      return (
        <Provider store={store}>
          <TypelessContext.Provider value={context}>
            <ConnectedRouter history={history}>{root}</ConnectedRouter>
          </TypelessContext.Provider>
        </Provider>
      );
    }
  }

  const App = hot(module)(App_);

  ReactDOM.render(<App store={store} history={history} />, MOUNT_NODE);
};
