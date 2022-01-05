import { RESPONSE, COMMON_HEADER } from '../../../../__mockData__';
import createExample from '../createExample';

describe('creatExample', () => {
  beforeEach(() => {
    RESPONSE.status.mockClear();
  });

  it('should create return 200 staus', async () => {
    await createExample({ headers: COMMON_HEADER, body: { test: 11 } }, RESPONSE);
    expect(logger.debug).toBeCalledWith('createExample::controller', 'started');
  });
});
