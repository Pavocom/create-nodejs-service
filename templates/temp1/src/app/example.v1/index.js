import { check } from 'express-validator';
import Express from 'express';
import creatExample from './createExample';
import getExample from './getExample';
import { requestValidator, asyncMiddleware } from '../../server/middlewares';

const router = Express.Router();
const createExampleValidation = [
  // username must be an email
  check('email').exists().isEmail(),
  // password must be at least 5 chars long
  check('password').exists().isLength({ min: 5 }),
];

const getExampleValidation = [
  // check('username').exists(),

];

router.get('/getExample', getExampleValidation, requestValidator, asyncMiddleware(getExample));
router.post('/createExample', createExampleValidation, requestValidator, asyncMiddleware(creatExample));


export default router;
