import 'dotenv/config';

global.reJSON = function reJSON(data) {
  return JSON.parse(JSON.stringify(data));
};

const log = jest.fn().mockImplementation(() => {
});

global.logger = {
  info: log,
  error: log,
  debug: log,
  log: log,
  silly: log,
  verbose: log,
  warn: log,
};

global.HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
}
