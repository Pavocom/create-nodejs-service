import express from 'express';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import requestId from 'express-request-id';
import swaggerUi from 'swagger-ui-express';
import { version, name } from '../../../package.json';
import { openTracingHandler, errorHandler } from '../middlewares';
import swaggerSpec from '../swagger';
import example from '../../app/example.v1';

const healthcheckInfo = {
  status: `${name} is up!!`,
  version,
};

export default function create() {
  const app = express();
  try {
    logger.debug('app::initExpress', 'express app init');
    app.set('showStackError', true);
    logger.debug('app::initExpress', 'express app init middleware');
    app.use(requestId());
    app.use(bodyparser.json());

    app.use(helmet());
    app.use(openTracingHandler);
    app.get('/healthcheck', (req, res) => res.send(healthcheckInfo));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // register new route
    app.use('/v1', example);
    app.use(errorHandler.generalException);
    app.use(errorHandler.notRegisteredRoute);
  } catch (error) {
    logger.error('app::initExpress', error);
    process.exit(-1);
  }
  return app;
}
