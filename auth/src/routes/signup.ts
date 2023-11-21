import express, { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      // console.log('Errors Found');
      throw new RequestValidationError(errors.errors);
      // return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;

    const currentUser = await User.findOne({ email });
    if (currentUser) {
      console.log('Email in use');
      throw new BadRequestError('User Already Exists');
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();

    // throw new DatabaseConnectionError();
    return res.status(200).send(user);
  }
);

export { router as signupRouter };
