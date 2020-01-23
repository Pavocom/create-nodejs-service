import { initTracer } from 'jaeger-client';
import { name } from '../../../package.json';

export default () => {
  const config = {
    serviceName: name,
    sampler: {
      type: 'const',
      param: 1,
    },
    reporter: {
      logSpans: true,
    },
  };
  const options = {
    logger: {
      info(msg) {
        logger.info('INFO ', msg);
      },
      error(msg) {
        logger.error('ERROR', msg);
      },
    },
  };
  return initTracer(config, options);
};
// module.exports.initTracer = serviceName => {
