import express, { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get(
  '/api/users/signup',
  [
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be valid'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      // console.log('Errors Found');
      throw new RequestValidationError(errors.errors);
      // return res.status(400).send(errors.array());
    }
    console.log('Hi There!');
    throw new DatabaseConnectionError();
    return res.status(200).send('Signup Done');
  }
);

export { router as signupRouter };
