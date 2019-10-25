import request from 'supertest';
import create from '../../../server';
import getExample from '../getExample';
import createExample from '../createExample';

jest.mock('../getExample');
jest.mock('../createExample');

describe('member action test suite', () => {
  const app = create();
  beforeAll(() => {
    getExample.mockImplementation((req, res) => res.end());
    createExample.mockImplementation((req, res) => res.end());
  });

  beforeEach(() => {
    getExample.mockClear();
    createExample.mockClear();
  });

  describe('Example test suite', () => {
    it('Should trigger getExample action on GET /v1/getExample', async () => {
      const subjectURL = '/v1/getExample';
      const response = await request(app)
        .get(subjectURL);

      expect(getExample).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toBe(200);
    });


    it('Should trigger createExample action on POST /v1/createExample', async () => {
      const body = {
        email: 'testusername@gmail.com',
        password: 'password',
      };
      const subjectURL = '/v1/createExample';
      const response = await request(app)
        .post(subjectURL)
        .send(body);
      expect(createExample).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toBe(200);
    });
    let undefinedvar;
    it.each([
      ['email is missing', undefinedvar, 'password'],
      ['email with wrong format ', 'test123', 'password'],
      ['password is missing', 'testusername@gmail.com', undefinedvar],
      ['password is less than 5 character', 'testusername@gmail.com', 'pp'],
    ])('Should respond with 400 when %s', async (title, email, password) => {
      const subjectURL = '/v1/createExample';
      const body = { email, password };
      const response = await request(app).post(subjectURL).send(body);
      expect(createExample).toHaveBeenCalledTimes(0);
      expect(response.statusCode).toBe(400);
    });
  });
});
