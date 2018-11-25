import { SampleModuleView } from './SampleModuleView';
import { epic, reducer } from './module';
import { createLoader } from './createLoader';

export default createLoader({
  component: SampleModuleView,
  epic,
  reducer,
  reducerPath: ['sampleModule'],
});
