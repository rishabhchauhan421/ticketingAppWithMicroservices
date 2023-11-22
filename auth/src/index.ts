import mongoose from 'mongoose';
import { app } from './app';
import { BadRequestError } from '@rishabhtickets/common';

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
