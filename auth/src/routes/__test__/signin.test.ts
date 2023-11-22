import { app } from './../../app';
import request from 'supertest';

it('return status code 200 if user is able to signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'abc@abc.com',
      password: '123124',
    })
    .expect(201);
  await request(app).get('/api/users/signout').send({}).expect(200);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'abc@abc.com',
      password: '123124',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('return status code 200 if user is not able to signin with incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'abc@abc.com',
      password: '123124',
    })
    .expect(201);
  await request(app).get('/api/users/signout').send({}).expect(200);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'abc@abc.com',
      password: '124',
    })
    .expect(400);
});
