import express from 'express';
import { json } from 'body-parser';
//to bypass custom errors handling with async
import 'express-async-errors';

import { currentUser, errorHandler } from '@rishabhtickets/common';
import { NotFoundError } from '@rishabhtickets/common';
import cookieSession from 'cookie-session';
import { CreateTicketRouter } from './routes/create-ticket';
import { ShowTicketRouter } from './routes/show-ticket';
import { IndexTicketRouter } from './routes/index-ticket';
import { UpdateTicketRouter } from './routes/update-ticket';

const app = express();

//Adding Cookie Support
app.set('trust proxy', 1);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
);
app.use(currentUser);

app.use(CreateTicketRouter);
app.use(ShowTicketRouter);
app.use(IndexTicketRouter);
app.use(UpdateTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
