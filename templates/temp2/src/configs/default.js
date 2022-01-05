export default
{
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV,
  tracer: {
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  },
};
