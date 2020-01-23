import createExample from '../createExample';

const res = {
  status: jest.fn().mockReturnValue({ send: () => {} }),
};
describe('creatExample', () => {
  beforeEach(() => {
    res.status.mockClear();
  });

  it('should create return 200 staus', async () => {
    await createExample({}, res);
    expect(logger.info).toBeCalledWith('test logger');
  });
});
