import express from 'express';
import { json } from 'body-parser';
//to bypass custom errors handling with async
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUser } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { BadRequestError } from './errors/bad-request-error';

const app = express();

//Adding Cookie Support
app.set('trust proxy', 1);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new BadRequestError('JWT Must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to Auth MongoDB');
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

startup();
