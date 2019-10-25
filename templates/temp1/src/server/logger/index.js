/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

export default class LoggerProvider {
  constructor() {
    this.m_loggerOptions = config.loggerOptions;
    this.debug = (method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.debug(method, message, requestId, meta);
      });
    };
    this.error = (method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.error(method, message, requestId, meta);
      });
    };
    this.info = (method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.info(method, message, requestId, meta);
      });
    };
    this.log = (level, method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.log(level, method, message, requestId, meta);
      });
    };
    this.silly = (method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.silly(method, message, requestId, meta);
      });
    };
    this.verbose = (method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.verbose(method, message, requestId, meta);
      });
    };
    this.warn = (method, message, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.warn(method, message, requestId, meta);
      });
    };
    if (this.m_loggerOptions.loggerProviders) {
      this.m_loggerProviders = this.m_loggerOptions.loggerProviders.map((provider) => {
        const providerInstance = require(provider.path);
        return (new providerInstance.Logger(provider.options));
      });
    }
    if (!this.m_loggerProviders || !this.m_loggerProviders.length) {
      this.m_loggerProviders = [];
    }
  }
}
