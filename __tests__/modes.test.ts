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
  it('should get a mode by id', async () => {
    const modeOne = await request(app)
      .post(MODE_ROUTE)
      .send({ name: 'Lydian' });
    const id = modeOne.body.mode.id;
    const res = await request(app).get(MODE_ROUTE + `/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Success',
      mode: { ...modeOne.body.mode, id: expect.any(Number) },
    });
  });
  it('should get all modes', async () => {
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
