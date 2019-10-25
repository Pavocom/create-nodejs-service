import getExample from '../getExample';
import { startSpan } from '../../../utils/openTracing';
import makeRequest from '../../../utils/requestHelper';

jest.mock('../../../utils/openTracing');
jest.mock('../../../utils/requestHelper');

const res = {
  status: jest.fn().mockReturnThis(),
  jsend: {
    error: jest.fn(),
    success: jest.fn(),
  },
};

describe('getExample', () => {
  beforeEach(() => {
    res.status.mockClear();
    res.jsend.error.mockClear();
    res.jsend.success.mockClear();
    startSpan.mockReturnValue({ id: '123456', finish: () => {}, log: () => {} });
  });

  it('should call 3  internal function and call make a request function', async () => {
    await getExample({ root_span: 'test' }, res);
    expect(res.jsend.success).toHaveBeenCalledTimes(1);
  });


  it('should catch any error return from internal call with reponse code 500 ', async () => {
    const error = new Error('unit test error ');
    makeRequest.mockImplementation(() => {
      throw error;
    });
    await getExample({ root_span: 'test' }, res);
    expect(res.jsend.error).toBeCalledWith(error);
  });
});
