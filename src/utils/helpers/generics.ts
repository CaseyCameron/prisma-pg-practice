import { Response, NextFunction } from 'express';

export const deleteTableResponse = async <T>(
  rows: T[],
  count: number,
  res: Response,
  next: NextFunction
) => {
  if (rows.length === count) {
    res.status(200).json({ message: 'Success' })
  } else {
    next(new Error('Could not delete all items'))
  }
}

export const handleTableResponse = async <T>(
  rows: T[],
  model: string,
  res: Response,
) => {
  const name = `${model}`
  if (rows.length) {
    res.status(200).json({
      message: 'Success',
      [name]: rows,
    })
  } else {
    res.status(200).json({
      message: `There are no ${name} yet`,
    })
  }
}

export const handleRowResponse = async <T>(
  row: T | null,
  model: string,
  res: Response,
  next: NextFunction
) => {
  const name = `${model.toLowerCase()}`
  if (row) {
    res.status(200).json({
      message: 'Success',
      [name]: row
    })
  } else {
    next(new Error(`${model} not found`))
  }
}
