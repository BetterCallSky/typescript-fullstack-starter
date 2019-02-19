import { merge } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { EpicChain, Deps } from './types';

export class RootEpic<TState> {
  private tree: { [x: string]: EpicChain<TState> };
  constructor() {
    this.tree = {};
  }
  handle(deps: Deps<TState>) {
    return deps.action$.pipe(
      mergeMap(action => {
        const handlers = Object.values(this.tree)
          .map(epic => epic.getHandlers()[action.type])
          .filter(x => x)
          .reduce((ret, arr) => {
            ret.push(...arr);
            return ret;
          }, []);
        return merge(...handlers.map(fn => fn(deps)(action)));
      })
    );
  }

  addEpic(epic: EpicChain<TState>) {
    this.tree[epic.epicName] = epic;
  }

  removeEpic(epicName: string) {
    delete this.tree[epicName];
  }

  hasEpic(epicName: string) {
    return !!this.tree[epicName];
  }
}
