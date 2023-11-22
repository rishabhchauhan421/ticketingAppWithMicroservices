import express from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUser };
