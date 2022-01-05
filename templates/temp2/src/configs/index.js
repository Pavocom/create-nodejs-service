import _ from 'lodash';
import errors from './errorCodes';
import constant from './appConstants';

const config = _.merge({},
  require('./default').default, errors, constant);

export default config;
