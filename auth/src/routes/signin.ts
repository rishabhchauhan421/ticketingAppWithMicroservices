import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/request-validation-error';
import { body, validationResult } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be  valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('Inside Signin!');

    const { email, password } = req.body;

    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      console.log('Email not in use');
      throw new BadRequestError('User do not exists');
    }

    const isPasswordMatched = await Password.compare(
      currentUser.password,
      password
    );
    console.log('Password is ' + isPasswordMatched);

    if (isPasswordMatched) {
      const userJwt = jwt.sign(
        {
          id: currentUser.id,
          email: currentUser.email,
        },
        process.env.JWT_KEY!
      );
      req.session = {
        jwt: userJwt,
      };
    } else {
      throw new BadRequestError('invalid credentials!');
    }
    res.status(200).send(currentUser);
  }
);

export { router as signinRouter };
