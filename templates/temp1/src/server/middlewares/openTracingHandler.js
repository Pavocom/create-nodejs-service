import { startServerSpan } from '../../utils/openTracing';

export default function (req, res, next) {
  try {
    const span = startServerSpan(req);
    req.root_span = span;
    return next();
  } catch (error) {
    throw error;
  }
}
