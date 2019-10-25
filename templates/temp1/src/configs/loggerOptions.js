import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

const env = process.env.NODE_ENV || 'dev';
const BASE_LOGS_DIRECTORY = process.env.LOG_FOLDER || './logs';
const LOGS_DIRECTORY = path.join(BASE_LOGS_DIRECTORY, process.env.NODE_APP || 'projectName');

mkdirp.sync(LOGS_DIRECTORY);
if (!fs.existsSync(LOGS_DIRECTORY)) {
  mkdirp.sync(LOGS_DIRECTORY);
}

export default {
  loggerOptions: {
    logFolderPath: LOGS_DIRECTORY,
    loggerProviders: [
      {
        path: './winstonLogger',
        options: {
          default: {
            level: 'silly',
            exitOnError: false,
          },
          transports: [
            {
              type: 'Console',
              transport: {
                name: 'console',
                level: env === 'dev' ? 'debug' : 'error',
                colorize: true,
              },
            },
          ],
        },
      },
      {
        path: './winstonLogger',
        options: {
          default: {
            level: 'verbose',
            exitOnError: false,
          },
          transports: [
            {
              type: 'File',
              transport: {
                name: 'file-log',
                level: env === 'dev' ? 'info' : 'info',
                filename: path.join(LOGS_DIRECTORY, 'logs.json'),
                maxsize: 1024 * 1024 * 5,
              },
            },
          ],
        },
      },
      {
        path: './exceptionLogger',
        options: {
          default: {
            level: 'verbose',
            exitOnError: false,
          },
          exception: {
            name: 'exception',
            level: 'verbose',
            filename: path.join(LOGS_DIRECTORY, 'exception.json'),
            maxsize: 1024 * 1024 * 5,
          },
          transports: [],
        },
      },
    ],
  },
};
