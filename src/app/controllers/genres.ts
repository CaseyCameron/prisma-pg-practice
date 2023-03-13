import { prisma } from '../../db/connect-to-db';
import { Request, Response, NextFunction } from 'express';
import { deleteRowResponse, deleteTableResponse, handleRowResponse, handleTableResponse } from '../../utils/helpers/generics';

const Prisma = prisma.genre

export const genresController = {
  addGenre: async (req: Request, res: Response, next: NextFunction) => {
    const { name, origin } = req.body;

    const genre = await Prisma.create({
      data: {
        name,
        origin
      },
    });

    res.status(201).json({
      message: 'Success',
      genre,
    });
  },
  getGenreById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const genre = await Prisma.findUnique({
      where: {
        id: +id,
      },
    });

    await handleRowResponse(genre, 'genre', res, next);
  },
  getGenres: async (req: Request, res: Response, next: NextFunction) => {
    const genres = await Prisma.findMany();

    await handleTableResponse(genres, 'genres', res);
  },
  editGenre: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { name } = req.body;
    const genre = await Prisma.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });

    await handleRowResponse(genre, 'genre', res, next);
  },
  deleteGenre: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const genre = await Prisma.delete({
      where: {
        id: +id,
      },
    })

    await deleteRowResponse(genre.id, +id, res, next)
  },
  deleteAllGenres: async (req: Request, res: Response, next: NextFunction) => {
    const genres = await Prisma.findMany();
    const { count } = await Prisma.deleteMany();
    await deleteTableResponse(genres, count, res, next);
  },
};
