import { app } from './../../app';
import request from 'supertest';

it('return status code 201 if username is passed', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'abc@abc.com',
      password: '12311224',
    })
    .expect(201);
});

it('return status code 400 if invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'abbc.com',
      password: '12311224',
    })
    .expect(400);
});

it('return status code 400 if invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'abbc@ab.com',
      password: '24',
    })
    .expect(400);
});

it('return cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'abb@ac.com',
      password: '12311224',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
