import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../../../package.json';

const swaggerDefinition = {
  info: {
    title: 'REST API for my App', // Title of the documentation
    version, // Version of the app
    description: 'This is the REST API for my product', // short description of the app
  },
  host: `${config.host}:${config.port}`, // the host or url of the app
  basePath: '/', // the basepath of your endpoint
};
const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../app/*/doc/*.yml')],
};
export default swaggerJSDoc(options);
