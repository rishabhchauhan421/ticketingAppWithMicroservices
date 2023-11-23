import mongoose from 'mongoose';
import { app } from './app';
import { BadRequestError } from '@rishabhtickets/common';

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new BadRequestError('JWT Must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Auth MongoDB');
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

startup();
