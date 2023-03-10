import { prisma } from '../../db/connect-to-db';
import { Request, Response, NextFunction } from 'express';
import { deleteTableResponse, handleRowResponse, handleTableResponse } from '../../utils/helpers/generics';

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
  getModeById:async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const mode = await Prisma.findUnique({ where: {
      id: +id
    }})
    
    await handleRowResponse(mode, 'mode', res, next)
  },
  getModes:async (req: Request, res: Response, next: NextFunction) => {
    const modes = await Prisma.findMany()
    
    await handleTableResponse(modes, 'modes', res)
  },
  deleteAllModes: async (req: Request, res: Response, next: NextFunction) => {
    const modes = await Prisma.findMany();
    const { count } = await Prisma.deleteMany();
    await deleteTableResponse(modes, count, res, next);
  },
};
