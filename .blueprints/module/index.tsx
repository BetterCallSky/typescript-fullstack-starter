import { ModuleLoader } from 'typeless';
import { {{name}}View } from './components/{{name}}View';
import { epic, reducer } from './module';
import React from 'react';
import { {{name}}Actions } from './actions';

export default () => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['{{camelCase name}}']}
    actions={ {{name}}Actions }
  >
    <{{name}}View />
  </ModuleLoader>
);
