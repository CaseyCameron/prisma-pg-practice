import request from 'supertest'
import app from '../src/app/app'
import { prisma } from '../src/db/connect-to-db';
import { SCALE_ROUTE, MODE_ROUTE } from '../src/utils/helpers'

describe('Scale tests', () => {
  afterEach(async () => {
    await prisma.genre.deleteMany({})
    await prisma.scale.deleteMany({})
    await prisma.mode.deleteMany({})
    await prisma.composer.deleteMany({})
    await prisma.composition.deleteMany({})
  })
  it('should post a scale', async () => {
    const mode = await request(app).post(MODE_ROUTE).send({ name: 'Lydian' });

    const res = await request(app).post(SCALE_ROUTE).send({
      name: 'Ionian',
      modes: mode.body.mode,
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: 'Success',
      scale: {
        id: expect.any(Number),
        name: 'Ionian',
        mode: { id: expect.any(Number), name: 'Lydian' },
        modeId: expect.any(Number),
      },
    });
  });
  it('should get all scales', async () => {
    const mode = await request(app).post(MODE_ROUTE).send({ name: 'Lydian' });
    await request(app).post(SCALE_ROUTE).send({
      name: 'Ionian',
      modes: mode.body.mode,
    });
    await request(app).post(SCALE_ROUTE).send({
      name: 'Melodic Minor',
    });
    const res = await request(app).get(SCALE_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      scales: [
        { id: expect.any(Number), name: 'Ionian', modeId: expect.any(Number) },
        { id: expect.any(Number), name: 'Melodic Minor', modeId: null },
      ],
    });
  });
});
