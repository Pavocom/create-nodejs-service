import _ from 'lodash';
import loggerOptions from './loggerOptions';
import errors from './errorCodes';

const config = _.merge({},
  require('./default').default, loggerOptions, errors);

export default config;
