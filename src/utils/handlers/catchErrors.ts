import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const catchErrors = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next)
  }
}

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorDetails = {
    message: err.message,
    status: err.status,
  }
  console.error(errorDetails.message);
  
  return res.status(err.status || 500).json(errorDetails)
}

export const handleValidation = (req: Request, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(new Error(`${errors.array()[0].msg}`))
  }
}
