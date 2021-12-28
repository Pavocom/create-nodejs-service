import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { correlationIdMiddleware } from '@ztarmobile/zmp-logger';
import { version, name } from '../../package.json';
import { openTracingHandler, errorHandler } from './middlewares';
import swaggerSpec from './swagger';
import example from '../app/example.v1';

const healthcheckInfo = {
  status: `${name} is up!!`,
  version,
  environment: config.nodeEnv,
};

export default function create() {
  const app = express();
  try {
    logger.debug('app::initExpress', 'express app init');
    app.set('showStackError', true);
    logger.debug('app::initExpress', 'express app init middleware');

    app.use(express.json());

    app.use(helmet());
    app.use(correlationIdMiddleware);

    app.get('/healthcheck', (req, res) => res.send(healthcheckInfo));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/v1', example);

    // register new route
    app.use(errorHandler.generalException);
    app.use(errorHandler.notRegisteredRoute);
    app.use(openTracingHandler);
  } catch (error) {
    logger.error('app::initExpress', error);
    process.exit(-1);
  }
  return app;
}
