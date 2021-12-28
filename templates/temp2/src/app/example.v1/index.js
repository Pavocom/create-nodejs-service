import { check } from 'express-validator';
import { AsyncRouter } from 'express-async-router';
import { requestValidator } from '../../server/middlewares';
import creatExample from './createExample';
import getExample from './getExample';

const router = new AsyncRouter();

const createExampleValidation = [
  // username must be an email
  check('email').exists().isEmail(),
  // password must be at least 5 chars long
  check('password').exists().isLength({ min: 5 }),
];

router.get('/getExample', getExample);
router.post('/createExample', createExampleValidation, requestValidator, creatExample);

export default router;
