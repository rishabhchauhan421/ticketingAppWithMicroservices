import { app } from './../../app';
import request from 'supertest';

it('return status code 200 if currentUser is correctly passed', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'abc@abc.com',
      password: '123124',
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('abc@abc.com');
});

it('return status code 400 if user is signed out after login', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'abc@abc.com',
      password: '123124',
    })
    .expect(201);

  await request(app).get('/api/users/signout').send().expect(200);

  const authResponse = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'abc@abc.com',
      password: '123124',
    })
    .expect(200);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('abc@abc.com');
});
