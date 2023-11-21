import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;
  reason = '';

  constructor(public msg: string) {
    super();
    this.reason = msg;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
