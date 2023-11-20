import express from 'express';
import { json } from 'body-parser';

import { currentUser } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(currentUser);
app.use(signinRouter);
app.use(currentUser);
app.use(signupRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
