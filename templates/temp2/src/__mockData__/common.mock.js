const {
  CONSTANT: {
    HEADERS_NAMES: {
      BRAND, IDEMPOTENT_KEY,
    },
  },
} = config;

export const RESPONSE = {
  status: jest.fn((status) => ({
    send: jest.fn((data) => ({ statusCode: status, data })),
  })),
};

export const SPAN = {
  id: '123456', finish: () => { }, log: () => { }, setTag: () => { }, end: () => { },
};

export const TRANSACTION = { commit: jest.fn(), rollback: jest.fn() };

export const IDEMPOTENT_KEY_HEADER = { [IDEMPOTENT_KEY]: '8122d950-aa4e-4929-865a-3bf292c5dcee' };

export const BRAND_HEADER = { [BRAND]: 'brand1' };

export const ORDER_ID = '1';

export const COMMON_HEADER = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer c3FIOG9vSGV4VHoAyg5T1JvNnJoZ3ExaVNyQWw6WjRsanRKZG5lQk9qUE1BVQ',
  ...BRAND_HEADER,
  ...IDEMPOTENT_KEY_HEADER,
};
