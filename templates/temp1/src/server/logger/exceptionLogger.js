/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
import * as winston from 'winston';

class ExceptionLogger {
  constructor(options) {
    this.m_logger = new winston.createLogger({
      level: options.default.level,
      exitOnError: options.default.exitOnError,
      exceptionHandlers: [
        new winston.transports.File(options.exception),
      ],
    });

    options.transports.forEach((t) => {
      this.m_logger.add(new winston.transports[t.type](t.transport));
    });

    this.debug = (method, message, requestId, meta) => {
      this.log('debug', method, message, requestId, meta);
    };
    this.error = (method, message, requestId, meta) => {
      this.log('error', method, message, requestId, meta);
    };
    this.info = (method, message, requestId, meta) => {
      this.log('info', method, message, requestId, meta);
    };
    this.log = (level, method, message, requestId, meta) => {
      let metaLog;
      if (requestId && typeof requestId === 'object' && !meta) {
        metaLog = requestId;
      } else {
        metaLog = meta || {};
        metaLog.requestId = requestId;
      }

      metaLog.method = method;
      metaLog.environment = process.env.NODE_ENV || 'dev';
      this.m_logger.log(level, message, metaLog);
    };
    this.silly = (method, message, requestId, meta) => {
      this.log('silly', method, message, requestId, meta);
    };
    this.verbose = (method, message, requestId, meta) => {
      this.log('verbose', method, message, requestId, meta);
    };
    this.warn = (method, message, requestId, meta) => {
      this.log('warn', method, message, requestId, meta);
    };
  }
}

export const Logger = ExceptionLogger;
