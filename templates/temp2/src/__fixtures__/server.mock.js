
import supertest from 'supertest';
import create from '../server';

export const createContext = () => {
  const server = create();
  const request = supertest(server);
  return {
    request,
    server,
  };
};

export const tearDown = async ({ server }) => {
  await server.close();
};
