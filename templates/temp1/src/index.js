/* eslint-disable no-undef */
import 'newrelic';
import './server/globals';
import './utils/kms/decrypt';
import config from './configs';
import createApp from './server';

const app = createApp();
app.listen(config.port, () => {
  logger.info('App start', `Started on port ${config.port}`);
});
