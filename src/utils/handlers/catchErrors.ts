import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const catchErrors = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next)
  }
}

export const handleValidation = (req: Request, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(new Error(`${errors.array()[0].msg}`))
  }
}
