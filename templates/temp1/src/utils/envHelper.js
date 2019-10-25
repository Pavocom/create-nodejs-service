import 'dotenv/config';

// Ensure required ENV vars are set
const requiredEnv = [
  'NODE_ENV',
];
const unsetEnv = requiredEnv.filter(env => !(typeof process.env[env] !== 'undefined'));


if (unsetEnv.length > 0 && process.env.NODE_ENV !== 'test') {
  throw new Error('Required ENV variables are not set: [" + unsetEnv.join(', ') + "]');
}
