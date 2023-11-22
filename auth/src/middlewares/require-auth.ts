import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserAttr } from '../models/user';
import { NotAuthorisedError } from '../errors/not-authorised-error';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.currentUser == null) {
    throw new NotAuthorisedError();
  }
  next();
}
