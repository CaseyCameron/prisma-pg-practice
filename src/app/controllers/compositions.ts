import { prisma } from '../../db/connect-to-db'
import { Request, Response, NextFunction } from 'express'
import {
  deleteRowResponse,
  deleteTableResponse,
  handleRowResponse,
  handleTableResponse,
} from '../../utils/helpers/generics';

const Prisma = prisma.composition

export const compositionsController = {
  addComposition: async (req: Request, res: Response, next: NextFunction) => {
    const { name, composer } = req.body;

    if (composer) {
      const composition = await Prisma.create({
        data: {
          name,
          composer: {
            connect: {
              id: composer.id,
            },
          },
        },
        include: {
          composer: true,
        },
      });
      res.status(201).json({ message: 'Success', composition });
    } else {
      const composition = await Prisma.create({
        data: {
          name,
        },
      });
      res.status(201).json({ message: 'Success', composition });
    }
  },
  getCompositionById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const composition = await Prisma.findUnique({
      where: {
        id: +id,
      },
    });

    await handleRowResponse(composition, 'composition', res, next);
  },
  getCompositions: async (req: Request, res: Response) => {
    const compositions = await Prisma.findMany();
    
    await handleTableResponse(compositions, 'compositions', res);
  },
  editComposition: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const { name } = req.body
    const composition = await Prisma.update({
      where: {
        id: +id
      },
      data: {
        name
      }
    })

    await handleRowResponse(composition, 'composition', res, next)
  },
  deleteComposition: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const composition = await Prisma.delete({
      where: {
        id: +id
      }
    })

    await deleteRowResponse(composition.id, +id, res, next)
  },
  deleteAllCompositions: async (req: Request, res: Response, next: NextFunction) => {
    const compositions = await Prisma.findMany()
    const { count } = await Prisma.deleteMany()

    await deleteTableResponse(compositions, count, res, next)
  }, 
};