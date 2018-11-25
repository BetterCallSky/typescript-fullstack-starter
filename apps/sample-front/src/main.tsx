import * as React from 'react';

import { createApp } from 'config/create-react';
import { Root } from './components/Root';

const { reload } = createApp(<Root />, () => require('./modules/index'));

if (module.hot) {
  module.hot.accept('./modules/index', reload);
}
