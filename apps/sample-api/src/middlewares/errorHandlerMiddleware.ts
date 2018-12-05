import { ValidationError } from 'veni';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../common/http-status';
import { ErrorRequestHandler } from 'express';
import { HttpError } from '../common/errors';
import logger from '../common/logger';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error | ValidationError | HttpError,
  req,
  res,
  next
) => {
  let status = 'statusCode' in err ? err.statusCode : INTERNAL_SERVER_ERROR;
  if (err instanceof ValidationError) {
    status = BAD_REQUEST;
  }
  if (status < BAD_REQUEST) {
    status = BAD_REQUEST;
  }
  const body: any = { status };

  if (err instanceof ValidationError) {
    body.error = err.message;
    body.errors = err.errors;
  } else {
    body.error = err.message;
  }
  if (process.env.NODE_ENV !== 'production') {
    body.stack = err.stack.split('\n');
  }
  logger.error(err, `${body.status} ${req.method} ${req.url}`);
  res.status(status);
  res.json(body);
};
