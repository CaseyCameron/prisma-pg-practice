import { prisma } from '../../db/connect-to-db';
import { Request, Response, NextFunction } from 'express';
import { deleteCollectionResponse, handleCollectionResponse } from '../../utils/helpers/generics';

type Mode = {
  id: string;
  name: string;
};

const Prisma = prisma.mode

export const modesController = {
  addMode: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const mode = await Prisma.create({
      data: {
        name,
      },
    });

    res.status(201).json({
        message: 'Success',
        mode,
      },
    );
  },
  getModes:async (req: Request, res: Response, next: NextFunction) => {
    const modes = await Prisma.findMany()
    
    await handleCollectionResponse(modes, 'modes', res)
  },
  deleteAllModes: async (req: Request, res: Response, next: NextFunction) => {
    const modes = await Prisma.findMany();
    const { count } = await Prisma.deleteMany();
    await deleteCollectionResponse(modes, count, res, next);
  },
};
