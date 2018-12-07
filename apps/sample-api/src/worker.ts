import { loadAmqp } from './common/loadAmqp';
import { contracts } from './contracts';

export const startWorker = () =>
  loadAmqp(contracts).catch(e => {
    console.error(e.stack);
    process.exit();
  });

if (!module.parent) {
  startWorker();
}
