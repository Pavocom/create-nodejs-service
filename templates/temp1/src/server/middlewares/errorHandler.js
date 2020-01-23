/* eslint-disable no-unused-vars */
import config from '../../configs/index';

// global error handler
const generalException = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  const errors = [{
    type: err.name || config.errors.generic.type,
    code: config.errors.generic.code,
    message: err.message || config.errors.generic.message,
    trace_id: req.id,
  }];
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ errors });
};

// Not found Error
const notRegisteredRoute = (req, res, next) => {
  const errors = [{
    type: config.errors.route.type,
    code: config.errors.route.code,
    message: config.errors.route.message,
    trace_id: req.id,
  }];
  res.status(HttpStatus.NOT_FOUND).json({ errors });
};

export default { generalException, notRegisteredRoute };
