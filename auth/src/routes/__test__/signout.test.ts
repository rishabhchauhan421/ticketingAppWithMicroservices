import { app } from './../../app';
import request from 'supertest';

it('return status code 200 if username is passed', async () => {
  const response = await request(app)
    .get('/api/users/signout')
    .send({})
    .expect(200);
  // console.log(response.get('Set-Cookie'));
  expect(response.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
