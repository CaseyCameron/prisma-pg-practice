import { Response, NextFunction } from 'express';

export const deleteCollectionResponse = async <T>(
  documents: T[],
  count: number,
  res: Response,
  next: NextFunction
) => {
  if (documents.length === count) {
    res.status(200).json({ message: 'Success' })
  } else {
    next(new Error('Could not delete all items'))
  }
}