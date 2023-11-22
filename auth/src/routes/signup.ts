import express, { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be  valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('inside signup');

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

    console.log('User is created');
    // console.log(process.env.JWT_KEY);
    //Adding JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    console.log('JWT added to Cookie');

    // throw new DatabaseConnectionError();
    return res.status(200).send(user);
  }
);

export { router as signupRouter };

// //TODO: Add JWT, modify standard output json, remove _id, password
// //TODO: Add signin logic
// //TODO: Create ValidateRequest middleware and apply to both login and signup
// //TODO: Create currentUser logic and check if JWT is correct
// //TODO: Create signout logic
// //TODO: Create 2 middleware 1) extract JWT payload and set it on req.currentUser 2) check if user is loggedIn via route access
// //TODO:
