import { Handler } from 'express';

/**
 * Wrap async function to standard express function
 * @param fn the async function
 * @returns the wrapped function
 */
function wrapRoute(fn: Handler): Handler {
  return (req, res, next) => {
    try {
      const result = fn(req, res, next);
      if (result && result.catch) {
        result.catch(next);
      }
    } catch (e) {
      next(e);
    }
  };
}

/**
 * Wrap all middlewares from array
 * @param obj the object (controller exports)
 * @returns   the wrapped object
 */
export function wrapExpress(obj: Handler | Handler[]) {
  if (Array.isArray(obj)) {
    return obj.map(wrapRoute);
  }
  return wrapRoute(obj);
}
