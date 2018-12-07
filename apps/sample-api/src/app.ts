import config from 'config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import passport from 'passport';
import { domainMiddleware } from './middlewares/domainMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { notFoundHandlerMiddleware } from './middlewares/notFoundHandlerMiddleware';
import logger from './common/logger';
import { connect } from 'mongoose';
import loadRoutes from './common/loadRoutes';
import './bindings/express';
import './bindings/amqp';
import { User, BearerToken } from './models';
import { contracts } from './contracts';
import { startWorker } from './worker';

const app = express();
app.set('port', config.PORT);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(domainMiddleware);

passport.use(
  new BearerStrategy(async (token, done) => {
    const bearerToken = await BearerToken.findById(token);
    if (!bearerToken) {
      return done(null, false);
    }
    const user = await User.findById(bearerToken.userId);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  })
);

const apiRouter = express.Router();

loadRoutes(apiRouter, contracts);

app.use('/' + config.BASE_URL, apiRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundHandlerMiddleware);

if (!module.parent) {
  const server = http.createServer(app);
  if (config.SINGLE_PROCESS) {
    startWorker();
  }
  connect(
    config.MONGODB_URL,
    { useNewUrlParser: true }
  )
    .then(() => {
      server.listen(app.get('port'), () => {
        logger.info(
          `Express server listening on port ${app.get('port')} in ${
            process.env.NODE_ENV
          } mode`
        );
      });
    })
    .catch(e => {
      logger.error('Cannot connect to MongoDB', e);
    });
}

export default app;
