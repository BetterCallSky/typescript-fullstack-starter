import { ModuleLoader } from 'typeless';
import { SampleModuleView } from './SampleModuleView';
import { epic, reducer } from './module';
import React from 'react';
import { SampleModuleActions } from './actions';

export default () => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['sampleModule']}
    actions={SampleModuleActions}
  >
    <SampleModuleView />
  </ModuleLoader>
);
