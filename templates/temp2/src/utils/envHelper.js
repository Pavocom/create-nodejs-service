import 'dotenv/config';

// Ensure required ENV vars are set
const requiredEnv = [
  'NODE_ENV',
  'ELASTIC_APM_SECRET_TOKEN',
  'ELASTIC_APM_SERVICE_NAME',
  'ELASTIC_APM_SERVER_URL',
];
const unsetEnv = requiredEnv.filter((env) => !(typeof process.env[env] !== 'undefined'));

if (unsetEnv.length > 0) {
  throw new Error(`Required ENV variables are not set: [${unsetEnv.join(', ')}]`);
}
