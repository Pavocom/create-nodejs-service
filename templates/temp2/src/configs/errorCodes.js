export default {
  errors: {
    VALIDATION: {
      status: 400,
      message: 'Invalid params',
      code: 102,
      type: 'Validation Error',
    },
    ROUTE_NOT_FOUND: {
      status: 500,
      message: 'Route not found',
      code: 101,
      type: 'Routing Error',
    },
    GENERIC: {
      status: 500,
      message: 'Internal error',
      code: 100,
      type: 'Generic Exception',
    },
  },
};
