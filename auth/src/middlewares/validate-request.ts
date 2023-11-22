import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.log('Errors Found');
    throw new RequestValidationError(result.array());
  }

  next();
}
