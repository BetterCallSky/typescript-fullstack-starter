import { from, of, empty, defer } from 'rxjs';
import * as Rx from 'rxjs/operators';
import { AC, EpicHandler, EpicChain, HandlerFn, DefaultState } from './types';
import { isAction, logAction } from './utils';

export const createEpic = <TState = DefaultState>(
  name: string
): EpicChain<TState> => {
  const handlers: { [x: string]: Array<HandlerFn<TState>> } = {};
  const chain: any = {};
  chain.epicName = name;
  chain.getHandlers = () => handlers;
  chain.attach = (epic: EpicChain<any>) => {
    const subHandlers = epic.getHandlers();
    Object.keys(subHandlers).forEach(key => {
      if (!handlers[key]) {
        handlers[key] = [];
      }
      handlers[key].push(...subHandlers[key]);
    });
    return chain;
  };
  const add = (ac: AC | AC[], handler: EpicHandler<AC, any>) => {
    const keys = Array.isArray(ac)
      ? ac.map(x => x.toString())
      : [ac.toString()];
    keys.forEach(key => {
      if (!handlers[key]) {
        handlers[key] = [];
      }
      handlers[key].push(deps => {
        return (sourceAction: any) => {
          if (process.env.NODE_ENV === 'development') {
            logAction(name, sourceAction);
          }
          return defer(() => {
            const result = handler(sourceAction.payload, deps, sourceAction);
            if (Array.isArray(result)) {
              return from(result);
            }
            if (isAction(result)) {
              return of(result);
            }
            return result;
          }).pipe(
            Rx.catchError(e => {
              console.error('Unhandled epic error on action.', {
                sourceAction,
                epic: name,
              });
              console.error(e.stack);
              return empty();
            }),
            Rx.mergeMap((action: any) => {
              if (action == null) {
                console.error('Undefined action returned in epic.', {
                  sourceAction,
                  epic: name,
                });
                return empty();
              }
              if (!isAction(action)) {
                console.error('Invalid action returned in epic.', {
                  sourceAction,
                  action,
                  epic: name,
                });
                return empty();
              }
              return of(action);
            })
          );
        };
      });
    });
    return chain;
  };

  chain.on = <TAC extends AC>(ac: TAC, handler: EpicHandler<TAC, any>) => {
    const ret = add(ac, handler);
    return ret;
  };

  chain.onMany = (ac: AC[], handler: EpicHandler<AC, any>) => {
    return add(ac, handler);
  };
  return chain;
};
