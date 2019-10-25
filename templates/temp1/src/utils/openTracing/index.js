/* eslint-disable consistent-return */
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing';
import initTracer from './initTracer';

let span;
const tracer = initTracer('projectName');

export const startServerSpan = (req) => {
  try {
    const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
    span = tracer.startSpan('http_server', {
      childOf: parentSpanContext,
      tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER },
    });
    return span;
  } catch (e) {
    throw e;
  }
};

export const startClientSpan = (name, Parentspan) => {
  try {
    span = tracer.startSpan(name, { childOf: Parentspan.context() });
    return { span, tracer };
  } catch (e) {
    span.tags('Error', 'extract from request fail, error msg:');
    throw e;
  }
};

export const startSpan = (func, Parentspan) => {
  try {
    if (Parentspan != null) {
      span = tracer.startSpan(func, { childOf: Parentspan.context() });
    } else {
      span = tracer.startSpan(func.name);
    }
    return span;
  } catch (error) { throw error; }
};

export const tracerFinsh = () => {
  try {
    tracer.finish();
  } catch (error) { throw error; }
};

export const setErrorSpan = (data) => {
  span.setTag(Tags.ERROR, true);
  span.log({
    level: 'error',
    message: data.message,
  });
  span.finish();
};
