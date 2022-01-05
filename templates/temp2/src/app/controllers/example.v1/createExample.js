import tracer from '../../../utils/openTracing';

export default async function (req, res) {
  logger.debug('createExample::controller', 'started');
  const span = req.rootSpan ? tracer.startSpan('create-example', { childOf: req.rootSpan }) : tracer.startSpan('create-example');
  try {
    const { body, headers: { brand, 'x-idempotent-key': idempotentKey } } = req;

    // call service layer
    return res.status(HttpStatus.CREATED).send({ body, brand, idempotentKey });
  } catch (error) {
    logger.error('createExample::controller', error);
    tracer.captureError(error);
    throw error;
  } finally {
    if (span) {
      span.end();
    }
  }
}
