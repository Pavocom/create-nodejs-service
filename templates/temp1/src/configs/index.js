import _ from 'lodash';
import loggerOptions from './loggerOptions';

const config = _.merge({},
  require('./default').default, loggerOptions);

export default config;
