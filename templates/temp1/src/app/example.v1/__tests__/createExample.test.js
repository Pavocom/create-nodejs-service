import createExample from '../createExample';

const res = {
  status: jest.fn().mockReturnThis(),
  jsend: {
    error: jest.fn(),
    success: jest.fn(),
  },
};

describe('creatExample', () => {
  beforeEach(() => {
    res.status.mockClear();
    res.jsend.error.mockClear();
    res.jsend.success.mockClear();
  });

  it('should create return 200 staus', async () => {
    await createExample({}, res);
    expect(res.jsend.success).toHaveBeenCalledTimes(1);
    expect(logger.info).toBeCalledWith('test logger');
  });
});
