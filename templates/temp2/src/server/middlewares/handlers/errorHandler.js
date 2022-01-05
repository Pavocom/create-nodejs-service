/* eslint-disable no-unused-vars */
import { correlator } from '@ztarmobile/zmp-logger';
import config from '../../../configs/index';

const sanitizeMicroserviceError = (errors) => errors.map((err) => ({
  type: err.type || config.errors.generic.type,
  code: err.code || config.errors.generic.code,
  message: err.customMessage || config.errors.generic.message,
  params: err.params,
}));

// global error handler
const generalException = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  /* eslint-disable no-param-reassign */
  if (typeof err.customMessage !== 'undefined') {
    err.message = err.customMessage;
    err.type = 'Backend Exception';
  }

  const errors = err.errors ? sanitizeMicroserviceError(err.errors) : [{
    type: err.type || config.errors.generic.type,
    code: err.code || config.errors.generic.code,
    message: err.message || config.errors.generic.message,
  }];
  const traceId = err.trace_id || err.response?.data?.trace_id || correlator.getId() || 'noCorrelationValue';
  res.status(err.status || err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ errors, trace_id: traceId }).end();
};

// Not found Error
const notRegisteredRoute = (req, res, next) => {
  const errors = [{
    type: config.errors.route.type,
    code: config.errors.route.code,
    message: config.errors.route.message,
    trace_id: correlator.getId(),
  }];
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ errors });
};

export default { generalException, notRegisteredRoute, sanitizeMicroserviceError };
