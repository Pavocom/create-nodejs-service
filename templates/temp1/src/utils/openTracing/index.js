/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing';
import initTracer from './initTracer';

const tracer = initTracer('project-name');

const serverSpan = (data) => {
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, data.headers);
  const hasParentSpan = parentSpanContext._parentIdStr;
  const span = hasParentSpan ? tracer.startSpan('http_server', { childOf: parentSpanContext, tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER } }) : tracer.startSpan('http_server');
  return span;
};
const functionSpan = (name, parentSpan) => (parentSpan ? tracer.startSpan(name, { childOf: parentSpan.context() }) : tracer.startSpan(name));

export const getTracer = () => (tracer);

export function startSpan(type, params, parentSpan) {
  logger.info('startSpan started');
  try {
    if (type === 'HTTP-SERVER') { return serverSpan(params); }
    return functionSpan(params, parentSpan);
  } catch (error) {
    logger.error('StartSpan', error);
    throw error;
  }
}
export const tracerFinish = () => {
  logger.info('tracerFinish started');
  try {
    tracer.finish();
  } catch (error) {
    logger.error('tracerFinish', error);
    throw error;
  }
};
export const setErrorSpan = (span, data) => {
  span.setTag(Tags.ERROR, true);
  span.log({
    level: 'error',
    message: data.message,
  });
  span.finish();
};
