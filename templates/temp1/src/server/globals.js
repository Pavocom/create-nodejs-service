import HttpStatus from 'http-status-codes';
import config from '../configs';
import LoggerProvider from './logger';

global.config = config;
global.HttpStatus = HttpStatus;
global.logger = new LoggerProvider();
