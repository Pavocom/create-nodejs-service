import '../utils/envHelper';
import HttpStatus from 'http-status-codes';
import { LoggerService, correlator } from '@ztarmobile/zmp-logger';
import config from '../configs';

global.config = config;
global.HttpStatus = HttpStatus;
global.logger = new LoggerService('project-name', {
  getCorrelationId: correlator.getId,
});
