import { prisma } from '../../db/connect-to-db';
import { Request, Response, NextFunction } from 'express';
import { deleteCollectionResponse } from '../../utils/helpers/generics';

type Mode = {
  id: string;
  name: string;
};

export const modesController = {
  addMode: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const mode = await prisma.mode.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      data: {
        message: 'Success',
        mode,
      },
    });
  },
  deleteAllModes: async (req: Request, res: Response, next: NextFunction) => {
    const modes = await prisma.mode.findMany({});
    const { count } = await prisma.mode.deleteMany({});
    await deleteCollectionResponse(modes, count, res, next);
  },
};
