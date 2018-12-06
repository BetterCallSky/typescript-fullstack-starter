import { UserDoc } from './models';

declare module 'express' {
  interface Request {
    user: UserDoc;
  }
}
