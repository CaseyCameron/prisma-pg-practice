import request from 'supertest'
import app from '../src/app/app'
import { prisma } from '../src/db/connect-to-db';
import { COMPOSITION_ROUTE, COMPOSER_ROUTE } from '../src/utils/helpers'

describe('Composition tests', () => {
  afterEach(async () => {
    await prisma.genre.deleteMany({})
    await prisma.composition.deleteMany({})
    await prisma.composer.deleteMany({})
    await prisma.composer.deleteMany({})
    await prisma.composition.deleteMany({})
  })
  it('should post a composition', async () => {
    const composer = await request(app).post(COMPOSER_ROUTE).send({ name: 'Sally', dob: new Date() });

    const res = await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Composition',
      composer: composer.body.composer,
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: 'Success',
      composition: {
        id: expect.any(Number),
        name: 'Some Composition',
        composer: { id: expect.any(Number), name: 'Sally', dob: expect.any(String) },
        composerId: expect.any(Number),
      },
    });
  });
  it('should get a composition by id', async () => {
    const composer = await request(app).post(COMPOSER_ROUTE).send({ name: 'Sally', dob: new Date() });
    const composition = await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Composition',
      composer: composer.body.composer,
    });
    const res = await request(app).get(COMPOSITION_ROUTE + `/${composition.body.composition.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      composition:
        {
          id: expect.any(Number),
          name: 'Some Composition',
          composerId: expect.any(Number),
        },
    });
  });
  it('should get all compositions', async () => {
    const composerOne = await request(app).post(COMPOSER_ROUTE).send({ name: 'Sally', dob: new Date() });
    await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Composition',
      composer: composerOne.body.composer,
    });
    await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Other Composition',
    });
    const res = await request(app).get(COMPOSITION_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      compositions: [
        { id: expect.any(Number), name: 'Some Composition', composerId: expect.any(Number) },
        { id: expect.any(Number), name: 'Some Other Composition', composerId: null },
      ],
    });
  });
  it('should update a composition', async () => {
    const composer = await request(app).post(COMPOSER_ROUTE).send({ name: 'Sally', dob: new Date() });
    const { body } = await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Composition',
      composer: composer.body.composer,
    });
    const composition = body.composition;
    const res = await request(app)
      .put(COMPOSITION_ROUTE + `/${composition.id}`)
      .send({
        ...composition,
        name: 'Adjusted Composition',
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      composition: {
        id: expect.any(Number),
        name: 'Adjusted Composition',
        composerId: expect.any(Number),
      },
    });
  });
  it('should delete a composition by id', async () => {
    const composer = await request(app).post(COMPOSER_ROUTE).send({ name: 'Sally', dob: new Date() });
    const { body } = await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Composition',
      composers: composer.body.composer,
    });
    const composition = body.composition;
    const res = await request(app).delete(COMPOSITION_ROUTE + `/${composition.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Success' });
  });
  it('should delete all composers', async () => {
    const composer = await request(app).post(COMPOSER_ROUTE).send({ name: 'Sally', dob: new Date() });
    await request(app).post(COMPOSITION_ROUTE).send({
      name: 'Some Composition',
      composers: composer.body.composer,
    });
    const res = await request(app).delete(COMPOSITION_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
});
