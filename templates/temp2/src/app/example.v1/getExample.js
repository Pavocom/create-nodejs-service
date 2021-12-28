import tracer from '../../utils/openTracing';

export default async function (req, res) {
  logger.debug('getExample::controller', 'started');
  const span = req.rootSpan ? tracer.startSpan('get-example', { childOf: req.rootSpan }) : tracer.startSpan('get-example');
  try {
    const { params: { exampleId }, headers: { brand } } = req;

    // call service layer
    return res.status(HttpStatus.OK).send({ exampleId, brand });
  } catch (error) {
    logger.error('getExample::controller', error);
    tracer.captureError(error);
    throw error;
  } finally {
    if (span) {
      span.end();
    }
  }
}
