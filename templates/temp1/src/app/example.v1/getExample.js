import makeRequest from '../../utils/requestHelper';
import { startSpan, setErrorSpan } from '../../utils/openTracing';

function func1(rootSpan) {
  const span = startSpan(func1.name, rootSpan);
  span.log({
    event: 'father',
    value: 'oooooo',
  });
  span.finish();
  return 2;
}

function func2(rootSpan) {
  const span = startSpan(func2.name, rootSpan);
  span.log({
    event: 'father',
    value: 'oooooo',
  });
  func1(span);
  span.finish();
  return 2;
}

export default async function (req, res) {
  const span = req.root_span ? startSpan('FUNCTION', 'getExammple', req.root_span) : startSpan('FUNCTION', 'getExammple');
  try {
    func1(span);
    func2(span);
    await makeRequest('get',
      'http://localhost:4000/v1/shipments/healthcheck',
      {}, null, null, span);
    span.finish();
    return res.status(HttpStatus.OK).jsend.success('success');
  } catch (error) {
    setErrorSpan(span, error);
    logger.error('getExample', error);
    return res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).jsend.error(error);
  }
}
