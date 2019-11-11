import { startSpan } from '../../utils/openTracing';

export default function (req, res, next) {
  try {
    const span = startSpan('HTTP-SERVER', req);
    req.root_span = span;
    return next();
  } catch (error) {
    throw error;
  }
}
