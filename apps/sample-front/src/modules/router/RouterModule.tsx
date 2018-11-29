import React from 'react';
import { ModuleLoader } from 'typeless';
import { epic, reducer } from './module';
import { RouterActions } from './actions';

export const RouterModule = (props: { children: React.ReactChild }) => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['router']}
    actions={RouterActions}
  >
    {props.children}
  </ModuleLoader>
);

export default RouterModule;
