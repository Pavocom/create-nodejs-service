import 'dotenv/config';
import * as ZtarLogger from '@ztarmobile/zmp-logger';
import config from './src/configs';

jest.mock('@ztarmobile/zmp-logger');

const correlationIdMiddlewareMock = jest.spyOn(
  ZtarLogger,
  'correlationIdMiddleware',
);
correlationIdMiddlewareMock.mockImplementation((req, res, next) => next());

global.logger = new ZtarLogger.LoggerService('test');

global.HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
  CREATED: 201,
};

const mockConfig = {
  swagger: { port: 2000 },
};
global.config = Object.assign(config, mockConfig);
