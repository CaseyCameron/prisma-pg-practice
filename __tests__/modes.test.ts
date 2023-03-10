import request from 'supertest';
import app from '../src/app/app';
import { MODE_ROUTE } from '../src/utils/helpers';

describe('Mode tests', () => {
  afterEach(async () => await request(app).delete(MODE_ROUTE));
  it('should post a mode', async () => {
    const res = await request(app).post(MODE_ROUTE).send({ name: 'Dorian' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Success',
      mode: { id: expect.any(Number), name: 'Dorian' },
    });
  });
  it.only('should get all modes', async () => {
    const modeOne = await request(app)
      .post(MODE_ROUTE)
      .send({ name: 'Dorian' });
    const modeTwo = await request(app)
      .post(MODE_ROUTE)
      .send({ name: 'Phrygian' });
    const res = await request(app).get(MODE_ROUTE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      modes: [
        { ...modeOne.body.mode, id: expect.any(Number) },
        { ...modeTwo.body.mode, id: expect.any(Number) },
      ],
    });
  });
  it('should delete all modes', async () => {
    await request(app).post(MODE_ROUTE).send({ name: 'Dorian' });
    const res = await request(app).delete(MODE_ROUTE)

    expect(res.status).toBe(200)
  })
});
