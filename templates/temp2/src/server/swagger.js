import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { version, name } from '../../package.json';

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: `REST API for ${name}`, // Title of the documentation
    version, // Version of the app
    description: `This is the REST API for  ${name}`, // short description of the app
  },
  host: `${config.host}:${config.port}`, // the host or url of the app
  basePath: '/', // the basepath of your endpoint
};
const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../app/**/docs/*.yml')],
};
export default swaggerJSDoc(options);
