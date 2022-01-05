import './server/globals';
import config from './configs';
import createApp from './server';

const app = createApp();
app.listen(config.port, () => {
  logger.info('App start', `Started on port ${config.port}`);
});
