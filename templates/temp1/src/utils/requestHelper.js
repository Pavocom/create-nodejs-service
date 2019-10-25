import axios from 'axios';
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing';
import { startClientSpan } from './openTracing/index';

export default async function makeRequest(method, url, headers, data, params, rootSpan) {
  const { span, tracer } = startClientSpan('http_request', rootSpan);
  try {
    span.setTag(Tags.HTTP_URL, url);
    span.setTag(Tags.HTTP_METHOD, method);
    span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT);

    // Send span context via request headers (parent id etc.)
    tracer.inject(span, FORMAT_HTTP_HEADERS, headers);

    const config = {
      method,
      url,
      headers,
    };
    if (method === 'get' && params != null) { config.params = params; } else if (data != null) { config.data = data; }

    const response = await axios(config);

    span.setTag(Tags.HTTP_STATUS_CODE, response.statusCode);
    span.finish();
  } catch (error) {
    span.setTag(Tags.ERROR, true);
    span.setTag(Tags.HTTP_STATUS_CODE, error.statusCode);
    span.log({
      event: 'error',
      message: error.message,
      error,
    });
    throw error;
  }
}
