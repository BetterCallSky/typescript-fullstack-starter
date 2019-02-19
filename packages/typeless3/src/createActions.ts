import { snakeCase } from './utils';
import { ActionMap, ConvertActions } from './types';

export function createActions<T extends ActionMap>(
  ns: string,
  actionMap: T
): ConvertActions<T> {
  const Actions = Object.keys(actionMap).reduce(
    (acc, key) => {
      const type = ns + '/' + snakeCase(key).toUpperCase();
      acc[key] = (...args: any[]) => {
        const ac = actionMap[key] || (() => ({}));
        const action = ac(...args) as any;
        action.type = type;
        return action;
      };
      acc[key].toString = () => type;
      return acc;
    },
    {} as { [s: string]: any }
  ) as any;
  return Actions;
}
