import request from 'supertest';
import app from '../src/app/app';
import { prisma } from '../src/db/connect-to-db';
import { GENRE_ROUTE } from '../src/utils/helpers';

describe('Genre tests', () => {
  afterEach(async () => {
    await prisma.genre.deleteMany({});
    await prisma.mode.deleteMany({});
    await prisma.scale.deleteMany({});
    await prisma.composer.deleteMany({});
    await prisma.composition.deleteMany({});
  });
  it('should post a genre', async () => {
    const res = await request(app)
      .post(GENRE_ROUTE)
      .send({ name: 'Jazz', origin: 'USA' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Success',
      genre: { id: expect.any(Number), name: 'Jazz', origin: 'USA' },
    });
  });
  it('should get a genre by id', async () => {
    const genreOne = await request(app)
      .post(GENRE_ROUTE)
      .send({ name: 'Jazz', origin: 'USA'  });
    const id = genreOne.body.genre.id;
    const res = await request(app).get(GENRE_ROUTE + `/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      genre: { ...genreOne.body.genre, id: expect.any(Number) },
    });
  });
  it('should get all genres', async () => {
    const genreOne = await request(app)
      .post(GENRE_ROUTE)
      .send({ name: 'Jazz', origin: 'USA' });
    const genreTwo = await request(app)
      .post(GENRE_ROUTE)
      .send({ name: 'Blues', origin: 'USA'  });
    const res = await request(app).get(GENRE_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      genres: [
        { ...genreOne.body.genre, id: expect.any(Number) },
        { ...genreTwo.body.genre, id: expect.any(Number) },
      ],
    });
  });
  it('should update a genre', async () => {
    const { body } = await request(app)
      .post(GENRE_ROUTE)
      .send({ name: 'Jazz', origin: 'USA' });
    const genre = body.genre;
    const res = await request(app)
      .put(GENRE_ROUTE + `/${genre.id}`)
      .send({
        ...genre,
        name: 'Blues',
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      genre: { ...genre, name: 'Blues' },
    });
  });
  it('should delete a genre', async () => {
    const { body } = await request(app)
      .post(GENRE_ROUTE)
      .send({ name: 'Jazz', origin: 'USA' });
    const genre = body.genre;
    const res = await request(app).delete(GENRE_ROUTE + `/${genre.id}`);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Success' });
  });
  it('should delete all genres', async () => {
    await request(app).post(GENRE_ROUTE).send({ name: 'Jazz', origin: 'USA' });
    const res = await request(app).delete(GENRE_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Success' });
  });
});
