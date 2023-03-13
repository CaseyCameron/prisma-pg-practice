import { prisma } from '../../db/connect-to-db';
import { Request, Response, NextFunction } from 'express';
import { deleteRowResponse, deleteTableResponse, handleRowResponse, handleTableResponse } from '../../utils/helpers/generics';

const Prisma = prisma.composer

export const composersController = {
  addComposer: async (req: Request, res: Response, next: NextFunction) => {
    const { name, dob } = req.body;
    console.log('name, dob', name, dob)

    const composer = await Prisma.create({
      data: {
        name,
        dob
      },
    });

    res.status(201).json({
      message: 'Success',
      composer,
    });
  },
  getComposerById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    console.log('id', id)
    const composer = await Prisma.findUnique({
      where: {
        id: +id,
      },
    });

    await handleRowResponse(composer, 'composer', res, next);
  },
  getComposers: async (req: Request, res: Response, next: NextFunction) => {
    const composers = await Prisma.findMany();

    await handleTableResponse(composers, 'composers', res);
  },
  editComposer: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { name } = req.body;
    const composer = await Prisma.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });

    await handleRowResponse(composer, 'composer', res, next);
  },
  deleteComposer: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const composer = await Prisma.delete({
      where: {
        id: +id,
      },
    })

    await deleteRowResponse(composer.id, +id, res, next)
  },
  deleteAllComposers: async (req: Request, res: Response, next: NextFunction) => {
    const composers = await Prisma.findMany();
    const { count } = await Prisma.deleteMany();
    await deleteTableResponse(composers, count, res, next);
  },
};
