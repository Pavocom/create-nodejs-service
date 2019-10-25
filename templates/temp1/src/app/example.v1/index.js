import { check } from 'express-validator';
import Express from 'express';
import creatExample from './createExample';
import getExample from './getExample';
import requestValidator from '../../server/middlewares/requestValidator';

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

router.get('/getExample', getExampleValidation, requestValidator, getExample);
router.post('/createExample', createExampleValidation, requestValidator, creatExample);


export default router;
