import { HttpCode } from '../../common/enums/enums.js';

export class HttpError extends Error {
  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = 'Network Error'
  } = {}) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
