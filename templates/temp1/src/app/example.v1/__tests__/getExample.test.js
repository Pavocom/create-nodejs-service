import getExample from '../getExample';
import { startSpan } from '../../../utils/openTracing';
import makeRequest from '../../../utils/requestHelper';

jest.mock('../../../utils/openTracing');
jest.mock('../../../utils/requestHelper');

const res = {
  status: jest.fn().mockReturnValue({ send: () => {} }),
};

describe('getExample', () => {
  beforeEach(() => {
    res.status.mockClear();
    startSpan.mockReturnValue({ id: '123456', finish: () => {}, log: () => {} });
  });

  it('should call 3 internal function and call make a request function', async () => {
    await getExample({ root_span: 'test' }, res);
    expect(makeRequest).toHaveBeenCalledTimes(1);
  });

  it('should catch any error return from internal call with reponse code 500 ', async () => {
    try {
      const unitTestError = new Error('unit test error');
      makeRequest.mockImplementation(() => {
        throw unitTestError;
      });
      await getExample({ root_span: 'test' }, res);
    } catch (error) {
      expect(error.message).toMatch('unit test error');
    }
  });
});
