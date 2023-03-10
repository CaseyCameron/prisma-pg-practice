import { prisma } from '../../db/connect-to-db'
import { Request, Response, NextFunction } from 'express'
import { handleRowResponse } from '../../utils/helpers/generics';

const Prisma = prisma.scale

export const scalesController = {
  addScale: async(req: Request, res: Response, next: NextFunction) => {
    const { name: scaleName, modes: modesArray } = req.body

    const scale = await Prisma.create({
      data: {
        name: scaleName,
        modes: modesArray
      }
    })

    res.status(201).json({ message: 'Success', scale})
  },
  getScaleById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const scale = await Prisma.findUnique({
      where: {
        id: +id,
      },
    });

    await handleRowResponse(scale, 'scale', res, next);
  },
}