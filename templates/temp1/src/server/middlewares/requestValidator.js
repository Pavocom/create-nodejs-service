import { validationResult } from 'express-validator';

export default function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.mapped() });
  }
  return next();
}
