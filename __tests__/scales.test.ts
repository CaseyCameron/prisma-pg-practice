import request from 'supertest'
import app from '../src/app/app'
import { SCALE_ROUTE, MODE_ROUTE } from '../src/utils/helpers'

describe('Scale tests', () => {
  it('should post a scale', async () => {
    const res = await request(app).post(SCALE_ROUTE).send({
      name: 'Ionian',
      modes: [
        {
          name: 'Dorian',
        },
      ],
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({});
  });
})
