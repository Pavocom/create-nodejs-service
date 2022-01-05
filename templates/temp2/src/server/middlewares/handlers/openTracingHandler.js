import tracer from '../../../utils/openTracing';

export default function (req, res, next) {
  try {
    logger.debug('openTracingHandler', `${tracer.currentTraceIds()}`);
    const parentSpan = tracer.currentTraceIds();
    if (parentSpan) {
      tracer.startSpan('', { childOf: parentSpan });
      const span = tracer.startSpan('HTTP-SERVER', req);
      req.root_span = span;
    }
    return next();
  } catch (error) {
    logger.error('openTracingHandler', `${error}`);
    throw error;
  }
}
