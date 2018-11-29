import { ModuleLoader } from 'typeless';
import { LoginView } from './components/LoginView';
import { epic, reducer } from './module';
import React from 'react';
import { LoginActions } from './actions';

export default () => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['login']}
    actions={ LoginActions }
  >
    <LoginView />
  </ModuleLoader>
);
