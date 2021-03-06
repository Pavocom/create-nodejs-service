
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

import { name } from './package.json';

exports.config = {
  app_name: [`${name}-${process.env.NODE_ENV}`],
  license_key: process.env.NEW_RELIC_LICENCE_KEY,
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || 'info',
  },
  agent_enabled: process.env.NEW_RELIC_ENABLED === 'true' || false,
};
