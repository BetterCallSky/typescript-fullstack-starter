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
import { createEpicMiddleware } from 'typeless';

const MOUNT_NODE = document.getElementById('root');

const history = createHistory();

export const createApp = (root: React.ReactNode, getModules: () => any) => {
  const createStore = (history: History) => {
    const { reducer, epic } = getModules();

    const epicMiddleware = createEpicMiddleware(epic);
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
      reducer,
      {},
      compose(applyMiddleware(...middleware))
    );

    const reload = () => {
      const { reducer, epic } = getModules();
      store.replaceReducer(reducer);
      epicMiddleware.replaceEpic(epic);
    };
    return { store, reload };
  };
  const { store, reload } = createStore(history);

  interface AppProps {
    history: any;
    store: Store<any>;
  }
  class App_ extends React.PureComponent<AppProps> {
    render() {
      const { history, store } = this.props;
      return (
        <Provider store={store}>
          <>
            <ConnectedRouter history={history}>{root}</ConnectedRouter>
          </>
        </Provider>
      );
    }
  }

  const App = hot(module)(App_);

  ReactDOM.render(<App store={store} history={history} />, MOUNT_NODE);
  return { reload };
};
