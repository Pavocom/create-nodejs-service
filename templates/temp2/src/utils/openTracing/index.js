const apm = require('elastic-apm-node');

function getAgent() {
  if (!apm.isStarted()) {
    return apm.start({
      serviceName: config.tracer.serviceName,
      secretToken: config.tracer.secretToken,
      serverUrl: config.tracer.serverUrl,
      captureBody: 'all',
      logLevel: 'warn',
      ignoreUrls: [
        '/docs',
      ],
      captureHeaders: true,
    });
  }
  return apm;
}

const tracer = getAgent();

export default tracer;
