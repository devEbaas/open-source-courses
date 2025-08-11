import { Request, Response, NextFunction } from 'express'

export const asyncHandler = <P = any>(fn: (req: Request, res: Response, next: NextFunction) => Promise<P> | P) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
