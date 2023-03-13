import request from 'supertest';
import app from '../src/app/app';
import { prisma } from '../src/db/connect-to-db';
import { COMPOSER_ROUTE } from '../src/utils/helpers';

describe('Composer tests', () => {
  afterEach(async () => {
    await prisma.genre.deleteMany({});
    await prisma.mode.deleteMany({});
    await prisma.scale.deleteMany({});
    await prisma.composer.deleteMany({});
    await prisma.composition.deleteMany({});
  });
  it('should post a composer', async () => {
    const res = await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sally', dob: new Date() });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Success',
      composer: {
        id: expect.any(Number),
        name: 'Sally',
        dob: expect.any(String),
      },
    });
  });
  it('should get a composer by id', async () => {
    const composerOne = await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sally', dob: new Date() });
    const id = composerOne.body.composer.id;
    const res = await request(app).get(COMPOSER_ROUTE + `/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      composer: { ...composerOne.body.composer, id: expect.any(Number) },
    });
  });
  it('should get all composers', async () => {
    const composerOne = await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sally', dob: new Date() });
    const composerTwo = await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sammy', dob: new Date() });
    const res = await request(app).get(COMPOSER_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      composers: [
        { ...composerOne.body.composer, id: expect.any(Number) },
        { ...composerTwo.body.composer, id: expect.any(Number) },
      ],
    });
  });
  it('should update a composer', async () => {
    const { body } = await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sally', dob: new Date() });
    const composer = body.composer;
    const res = await request(app)
      .put(COMPOSER_ROUTE + `/${composer.id}`)
      .send({
        ...composer,
        name: 'Blues',
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      composer: { ...composer, name: 'Blues' },
    });
  });
  it('should delete a composer', async () => {
    const { body } = await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sally', dob: new Date() });
    const composer = body.composer;
    const res = await request(app).delete(COMPOSER_ROUTE + `/${composer.id}`);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Success' });
  });
  it('should delete all composers', async () => {
    await request(app)
      .post(COMPOSER_ROUTE)
      .send({ name: 'Sally', dob: new Date() });
    const res = await request(app).delete(COMPOSER_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Success' });
  });
});
