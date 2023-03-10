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

export const handleCollectionResponse = async <T>(
  documents: T[],
  model: string,
  res: Response,
) => {
  const name = `${model}`
  if (documents.length) {
    res.status(200).json({
      message: 'Success',
      [name]: documents,
    })
  } else {
    res.status(200).json({
      message: `There are no ${name} yet`,
    })
  }
}