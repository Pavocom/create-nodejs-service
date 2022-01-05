import { validationResult } from 'express-validator';

const errorFormatter = ({
  location, msg, param, value,
}) => ({
  message: msg, param_name: param, param_value: param === 'password' ? null : value, location,
});

export default function (req, res, next) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    const error = {
      message: config.errors.VALIDATION.message,
      type: config.errors.VALIDATION.type,
      code: config.errors.VALIDATION.code,
      trace_id: req.id,
      params: errors.array({ onlyFirstError: true }),
    };
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: [error] });
  }
  return next();
}
