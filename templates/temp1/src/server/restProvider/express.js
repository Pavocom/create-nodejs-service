import express from 'express';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import requestId from 'express-request-id';
import jsend from 'jsend';
import swaggerUi from 'swagger-ui-express';
import example from '../../app/example.v1';
import openTracingHandler from '../middlewares/openTracingHandler';
import swaggerSpec from '../swagger';

const getResponse = req => ({
  status: 'OK',
  environment: process.env.NODE_ENV,
  version: req.headers['accept-version'],
});


export default function create() {
  const app = express();
  try {
    logger.debug('app::initExpress', 'express app init');
    app.set('showStackError', true);
    logger.debug('app::initExpress', 'express app init middleware');
    app.use(requestId());
    app.use(bodyparser.json());
    app.use(helmet());

    app.use(jsend.middleware);
    app.use(openTracingHandler);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/healthcheck', (req, res) => res.send(getResponse(req)));
    app.use('/v1', example);
  } catch (error) {
    logger.error(error);
  }
  return app;
}
