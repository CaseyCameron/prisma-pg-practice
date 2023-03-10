import { prisma } from '../../db/connect-to-db'
import { Request, Response, NextFunction } from 'express'

export const scalesController = {
  addScale: async(req: Request, res: Response, next: NextFunction) => {
    const { name: scaleName, modes: modesArray } = req.body

    await prisma.scale.create({
      data: {
        name: scaleName,
        modes: modesArray
      }
    })
  }
}