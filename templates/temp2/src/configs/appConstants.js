export default {
  CONSTANT: {
    VALIDATION_MESSAGES: {
      INVALID_UUID: 'This field should be a valid UUID.',
      REQUIRED: 'This field is required.',
      INVALID_ARRAY: 'This field should be an array.',
      EMPTY_ARRAY: 'This field should not be an empty array.',
      INVALID_STRING: 'This field should be a string.',
      INVALID_EMAIL: 'This field should have a valid email format.',
      INVALID_NUMERIC: 'This field should have a valid numeric value (number or string format), with no symbols (+, -, .).',
      IS_NULL: 'This field should be non-null.',
      INVALID_DECIMAL: 'This field should be a valid decimal value, with scale 8.',
      INVALID_OBJECT: 'This field should be a valid object.',
      INACCURATE_PRECISION: 'This floating point field has inaccurate precision.',
      UNALLOWED_FIELD: 'This field should not exist.',
    },
    HEADERS_NAMES: {
      BRAND_HEADER_NAME: 'brand',
      IDEMPOTENT_KEY_HEADER_NAME: 'x-idempotent-key',
    },
  },
};
