import { prisma } from '../../db/connect-to-db'
import { Request, Response, NextFunction } from 'express'
import {
  deleteRowResponse,
  deleteTableResponse,
  handleRowResponse,
  handleTableResponse,
} from '../../utils/helpers/generics';

const Prisma = prisma.scale

export const scalesController = {
  addScale: async (req: Request, res: Response, next: NextFunction) => {
    const { name, modes } = req.body;

    if (modes) {
      const scale = await Prisma.create({
        data: {
          name,
          mode: {
            connect: {
              id: modes.id,
            },
          },
        },
        include: {
          mode: true,
        },
      });
      res.status(201).json({ message: 'Success', scale });
    } else {
      const scale = await Prisma.create({
        data: {
          name,
        },
      });
      res.status(201).json({ message: 'Success', scale });
    }
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
  getScales: async (req: Request, res: Response) => {
    const scales = await Prisma.findMany();
    
    await handleTableResponse(scales, 'scales', res);
  },
  editScale: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const { name } = req.body
    const scale = await Prisma.update({
      where: {
        id: +id
      },
      data: {
        name
      }
    })

    await handleRowResponse(scale, 'scale', res, next)
  },
  deleteScale: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const scale = await Prisma.delete({
      where: {
        id: +id
      }
    })

    await deleteRowResponse(scale.id, +id, res, next)
  },
  deleteAllScales: async (req: Request, res: Response, next: NextFunction) => {
    const scales = await Prisma.findMany()
    const { count } = await Prisma.deleteMany()

    await deleteTableResponse(scales, count, res, next)
  }, 
};