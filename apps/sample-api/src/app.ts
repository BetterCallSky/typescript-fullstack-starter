import config from 'config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { domainMiddleware } from './middlewares/domainMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { notFoundHandlerMiddleware } from './middlewares/notFoundHandlerMiddleware';
import logger from './common/logger';
import { connect } from 'mongoose';

const app = express();
app.set('port', config.PORT);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(domainMiddleware);

const apiRouter = express.Router();

app.use('/' + config.BASE_URL, apiRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundHandlerMiddleware);

if (!module.parent) {
  const server = http.createServer(app);
  connect(config.MONGODB_URL)
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
