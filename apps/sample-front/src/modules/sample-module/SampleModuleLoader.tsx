import { ModuleLoader } from 'typeless';
import { SampleModuleView } from './SampleModuleView';
import { epic, reducer } from './module';
import React from 'react';

// export default createLoader({
//   component: SampleModuleView,
//   epic,
//   reducer,
//   reducerPath: ['sampleModule'],
// });

export default () => (
  <ModuleLoader epic={epic} reducer={reducer} reducerPath={['sampleModule']}>
    <SampleModuleView />
  </ModuleLoader>
);
