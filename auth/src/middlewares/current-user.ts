import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserAttr } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserAttr;
    }
  }
}
export function currentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    next();
  }
  try {
    const payload = jwt.verify(
      req.session!.jwt,
      process.env.JWT_KEY!
    ) as UserAttr;
    req.currentUser = payload;
  } catch (e) {
    console.log('Invalid JWT');
  }
  next();
}
