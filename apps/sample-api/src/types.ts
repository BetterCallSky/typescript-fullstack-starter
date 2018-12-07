import { UserDoc } from './models';
import { Request, Response, NextFunction } from 'express';

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

declare module 'express' {
  interface Request {
    user: UserDoc;
  }
}
