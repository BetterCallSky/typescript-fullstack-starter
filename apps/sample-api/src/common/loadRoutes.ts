/**
 * An util to load routes
 */
import * as R from 'r';
import passport from 'passport';
import { Router, Handler } from 'express';
import { ContractBinding } from 'defensive';
import { wrapExpress } from './wrapExpress';
import { UnauthorizedError } from './errors';
import logger from './logger';

/**
 * Load all routes with authentication check
 * @param {Object} router the express router
 * @param {Object} routes the route config
 */
export default function loadRoutes(
  router: Router,
  bindings: ContractBinding<any>[]
) {
  R.flatMap(bindings, x => x.expressOptions || []).forEach(options => {
    const actions: Handler[] = [
      (req, res, next) => {
        if (!req.headers.authorization) {
          return next();
        }
        return passport.authenticate('bearer', { session: false })(
          req,
          res,
          next
        );
      },
      (req, res, next) => {
        if (options.public) {
          next();
          return;
        }
        if (!req.user) {
          next(new UnauthorizedError('Bearer token required'));
          return;
        }
        next();
      },
    ];
    logger.info(
      `${options.public ? '[Public]' : ''} ${options.method.toUpperCase()} ${
        options.path
      }`
    );
    if (options.handler) {
      actions.push(options.handler);
    } else {
      actions.push((req, res, next) => {
        Promise.resolve(options.json!(req, res))
          .then(ret => {
            console.log({ ret });
            res.json(ret);
          })
          .catch(next);
      });
    }
    router[options.method](options.path, wrapExpress(actions));
  });
}
